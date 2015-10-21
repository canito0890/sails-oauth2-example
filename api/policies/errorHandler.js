/**
 * Error Handling Policy
 *
 * TODO describe
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

module.exports = function (req, res, next) {

  return oauth2.errorHandler({ mode: 'indirect' })(req, res, next);
};
