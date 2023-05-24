module.exports = async function name(req, res, proceed) {
  if (!req.headers || !req.headers.authorization) {
    return res.badRequest({ error: 'No hay una cabecera de autorizacion' });
  }

  const token = req.headers.authorization;
  const decodedToken = AuthenticationService.JWTVerify(token);
  const user = await User.findOne({ id: decodedToken.user });
  if (!user) {
    return res.unauthorized({ error: 'No esta autorizado' });
  }
  req.user = user.id;
  return proceed();
};
