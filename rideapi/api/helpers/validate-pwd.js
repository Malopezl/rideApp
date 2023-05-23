const bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'Validate pwd',


  description: '',


  inputs: {
    password: {
      type: 'string',
      required: true,
    },
    passwordUsr: {
      type: 'string',
      required: true,
    }
  },


  exits: {},


  fn: async function (inputs, exits) {
    const comparedPwd = bcrypt.compare(inputs.password, inputs.passwordUsr);
    return exits.success(comparedPwd);
  }


};

