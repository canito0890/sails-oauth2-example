/**
 * Passport Config
 * (sails.config.passport)
 * This is the configuration file for the Passport setup.
 * Define required strategies here.
 */
module.exports.passport = {
  /**
   * Local Strategy
   */
  local: {
    strategy: require('passport-local').Strategy
  },
  /**
   * Bearer Strategy
   */
  bearer: {
    strategy: require('passport-http-bearer').Strategy
  },
  /**
   * Basic Strategy
   */
  basic: {
    strategy: require('passport-http').BasicStrategy
  },
  /**
   * Client Password Strategy
   * TODO implement strategy
   */
  clientPassword: {
    strategy: require('passport-oauth2-client-password').Strategy
  }

};
