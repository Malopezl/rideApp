const bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'Generate pwd',


  description: '',


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

