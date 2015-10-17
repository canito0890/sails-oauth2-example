/**
 * Passport Service
 * Defines the system's strategies
 */
var passport = require('passport'),
    moment = require('moment'),
  bcrypt = require('bcrypt'),
  strategies = sails.config.passport;

var LocalStrategy = strategies.local.strategy;
passport.use(new LocalStrategy(function(mail, password, next){

  User.findOne({ mail: mail }).exec(function(err, user){
    // db error
    if(err) return next(err);
    // not found
    if(!user) return next(null, false, { message: 'User not found' });

    bcrypt.compare(password, user.password, function(err, res){
      if(err) return next(err, null);
      else if(!res) return next(null, false, { message: 'Invalid password' });
      else return next(null, user);
    });
  });
}));

/**
 * BasicStrategy & ClientPasswordStrategy
 *
 * These strategies are used to authenticate registered OAuth clients.  They are
 * employed to protect the `token` endpoint, which consumers use to obtain
 * access tokens.  The OAuth 2.0 specification suggests that clients use the
 * HTTP Basic scheme to authenticate.  Use of the client password strategy
 * allows clients to send the same credentials in the request body (as opposed
 * to the `Authorization` header).  While this approach is not recommended by
 * the specification, in practice it is quite common.
 */
var BasicStrategy = strategies.basic.strategy;
passport.use(new BasicStrategy(function (mail, password, done){
  sails.log('basic strategy', mail);
  User.findOne({ mail: mail, isActive: true }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    bcrypt.compare(password, user.password, function(err, res){
      if(err) return done(err, null);
      else if(!res) return done( null, false, { message: 'Invalid password' });
      else return done(null, user);
    });
  });
}));

// TODO implement ClientPasswordStrategy
//var ClientPasswordStrategy = strategies.clientPassword.strategy;
passport.use('client-basic', new BasicStrategy(function (clientId, clientSecret, done) {
  sails.log('client password', clientId, clientSecret);
  Client.findOne({ clientId: clientId, secret: clientSecret }, function (err, client) {
    if(err) return done(err);
    if(!client) return done(null, false);
    return done(null, client);
  });
}));

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate users based on an access token (aka a
 * bearer token).  The user must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
var BearerStrategy = strategies.bearer.strategy;
passport.use(new BearerStrategy(function(accessToken, done) {
  AccessToken.findOne({ token:accessToken }, function(err, token) {
    if (err) { return done(err); }
    if (!token) { return done(null, false); }
    // TODO should token expire? if so, when?
    //var now = moment().unix();
    //var creationDate = moment(token.createdAt).unix();

    /**if( now - creationDate > sails.config.oauth.tokenLife ) {
      AccessToken.destroy({ token: accessToken }, function (err) {
        if(err) return done(err);
      });
      sails.log('Token expired');
      return done(null, false, { message: 'Token expired' });
    }*/
    var info = { scope: '*' };
    User.findOne({
      id: token.owner
    })
    .exec(function (err, user) {
      done(err,user,info);
    });
  });
}));

module.exports = passport;
