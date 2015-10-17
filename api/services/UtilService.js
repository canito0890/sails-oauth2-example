/**
 * UtilService.js
 *
 * @description :: utility function service. It helps with reused functions and uid generating functions.
 *
 */
var moment = require('moment');

/**
 * Return a random int, used by `utils.uid()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {

  uid: function(len) {
    var buf = [], chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', charlen = chars.length;
    for (var i = 0; i < len; ++i) buf.push(chars[getRandomInt(0, charlen - 1)]);
    return buf.join('');
  },
  uidLight: function(len) {
    var buf = [], chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', charlen = chars.length;
    for (var i = 0; i < len; ++i) buf.push(chars[getRandomInt(0, charlen - 1)]);
    return buf.join('');
  },
  encodeQuery: function(data){
    return Object.keys(data).map(function(key) {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
  },
  getUrl: function(path, data){
    if(path.match(/\/$/)) path = path.slice(0, -1);
    return path + '?' + this.encodeQuery(data);
  },
  now: function(){
    return moment().toISOString();
  },
  daysFromNow: function(days){
    return moment().add(days, 'd').toISOString();
  }
};
