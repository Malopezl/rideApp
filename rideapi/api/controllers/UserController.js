const joi = require('joi');

/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  /**
   * `UserController.signup()`
   */
  signup: async function (req, res) {
    try {
      const schema = joi.object().keys({
        email: joi.string().required().email(),
        password: joi.string().required(),
      });
      const { email, password } = await schema.validateAsync(req.allParams());
      const user = await User.create({email, password}).fetch();
      return res.ok(user);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.badRequest({ error }).json();
      }
      return res.serverError({ error }).json();
    }
  },

  /**
   * `UserController.login()`
   */
  login: async function (req, res) {
    return res.json({
      todo: 'login() is not implemented yet!',
    });
  },
};
