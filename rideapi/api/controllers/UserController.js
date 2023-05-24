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
      const hash = await sails.helpers.generatePwd(password);
      const user = await User.create({ email, password: hash }).fetch();
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
    try {
      const schema = joi.object().keys({
        email: joi.string().required().email(),
        password: joi.string().required(),
      });
      const { email, password } = await schema.validateAsync(req.allParams());
      const user = await User.findOne({ email });
      if (!user) {
        return res.notFound({ error: 'User not found' });
      }
      const comparedPassword = await sails.helpers.validatePwd(
        password,
        user.password
      );
      const token = AuthenticationService.JWTIssuer({ user: user.id }, '1 day');
      return comparedPassword
        ? res.ok({ token })
        : res.badRequest({ error: 'Unauthorized' });
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res.badRequest({ error }).json();
      }
      return res.serverError({ error }).json();
    }
  },
};
