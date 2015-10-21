/**
* AuthCode.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    code: {
      type: 'string'
    },
    owner: {
      model: 'user',
      required: true
    },
    clientId: {
      type: 'string',
      required: true
    },
    url: {
      type: 'string',
      required: true
    }
  },
  beforeCreate: function(values, next){
    values.code = UtilsService.uid(32);
    next();
  }
};
