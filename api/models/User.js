/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      size: 100,
      required: true
    },
    mail: {
      type: 'email',
      size: 100,
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      protected: true
    },
    clients: {
      collection: 'client',
      via: 'owner'
    }
    /**
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }*/
  },
  /**
   * Before Create Callback
   * @param {Object} - values => values hash
   * @param {Function} - next => callback
   */
  beforeCreate: function(values, next){
    if(values.password){
      User.findOne({email: values.email}).exec(function (err, record) {
        this.uniqueMail = !err && !record;
        if(values.isActive) delete values.isActive;
        HashService.password(values.password, function(err, hash){
          delete values.password;
          if(err) return next(err);
          values.password = hash;
          next();
        });
      });
    }
  }
};
