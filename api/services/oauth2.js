/**
 * OAuth2orize Service
 * Defines the OAuth2 Server
 */
var oauth2orize = require('oauth2orize');
var server = oauth2orize.createServer();

// Register serialialization function
server.serializeClient(function(client, callback) {
  sails.log('server serializeClient', client);
  return callback(null, client.id);
});

// Register deserialization function
server.deserializeClient(function(id, callback) {
  sails.log('server deserializeClient', id);
  Client.findOne({ id: id }, function (err, client) {
    if (err) { return callback(err); }
    return callback(null, client);
  });
});

// Register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, url, user, ares, next) {
  sails.log('server grant', client, url, user, ares);
  // TODO cleanup should be AuthCode class method?
  // Create a new authorization code
  var data = {
    value: UtilsService.uid(16),
    clientId: client.clientId,
    url: url,
    owner: client.owner
  };
  // Save the auth code and check for errors`
  AuthCode.create(data, function(err, authCode){
    if (err) { return next(err); }
    next(null, authCode.code);
  });
}));

// Exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(function(client, code, url, callback) {
  sails.log('server exchange', client, code, url);
  // TODO Should be sent to AuthCode.exchange method
  AuthCode.findOne({ code: code }, function (err, authCode) {
    sails.log('code search', err, authCode);
    if(err) return callback(err);
    // TODO cleanup conditions
    if (authCode === undefined) { return callback(null, false); }
    if (client.clientId !== authCode.clientId) { return callback(null, false); }
    if (url !== authCode.url) return callback(null, false);
    // Delete auth code now that it has been used
    sails.log('destroy!!');
    AuthCode.destroy({ id: authCode.id }, function(err){
      if(err) return callback(err);
      // Create a new access token
      var data = {
        value: UtilsService.uid(256),
        clientId: authCode.clientId,
        owner: authCode.owner
      };
      AccessToken.create(data, function(err, token){
        sails.log('access token creare', err, token);
        if(err) return callback(err);
        callback(null, token);
      });
    });
  });
}));

module.exports = server;
