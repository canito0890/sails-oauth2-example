/**
 * OAuth2Controller
 *
 * @description :: Server-side logic for managing OAuth2 process
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
    * GET /oauth2/authorize
    * Must go through passport basic auth policies and oauth2 to receive authorization data.
    * @param  {Object}  req - Incoming request
    * @param  {Object}  res - Outgoing response
    *
    */
  authorization: function(req, res){
    //res.json({ transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client, oauth2: req.oauth2 });
    res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
  },
  decision: oauth2.decision(),
  token: function(req, res){
    res.json({});
  }
};
