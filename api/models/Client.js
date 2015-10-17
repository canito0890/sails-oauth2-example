/**
* Client.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    owner: {
      model: 'user',
      required: true
    },
    clientId: {
      type: 'string',
      unique: true
    },
    secret: {
      type: 'string',
      unique: true
    }
  },
  beforeCreate: function(values, next){
    values.clientId = UtilsService.uidLight(32);
    values.secret = UtilsService.uid(64); // TODO apply encryption
    next();
  }
};
