/**
* AccessToken.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    owner: {
      model: 'user',
      required: true
    },
    clientId: {
      type: 'string',
      required: true
    },
    token: 'string',
    scope: 'string'
  },
  beforeCreate: function(values, next){
    values.token = UtilsService.uid(256);
    next();
  }
};
