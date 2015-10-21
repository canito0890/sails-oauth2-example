/**
 * Grant Token Policy
 *
 * TODO describe policy
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

module.exports = function (req, res, next) {

  return oauth2.token()(req, res, next);
};
