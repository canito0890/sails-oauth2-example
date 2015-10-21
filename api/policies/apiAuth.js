/**
 * Api Auth Policy
 *
 * TODO api auth policy describe
 *
 * @param {Object}   req
 * @param {Object}   res
 * @param {Function} next
 */

module.exports = function (req, res, next) {

  return passport.authenticate(['basic','bearer'], { session: false })(req, res, next);
};
