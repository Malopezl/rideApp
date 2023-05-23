const bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'Password helper',


  description: 'Password generation',


  inputs: {
    password: {
      type: 'string',
      required: true,
    }
  },


  exits: {},


  fn: async function (inputs, exits) {
    const hash = bcrypt.hashSync(inputs.password, 10);
    return exits.success(hash);
  }


};

