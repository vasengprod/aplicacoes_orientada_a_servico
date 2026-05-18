import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next();
  }

  const parts = authorization.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Token mal formatado.",
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Token deve estar no formato Bearer <TOKEN>.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await req.context.models.User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).send({
        error: "Unauthorized",
        message: "Usuário não encontrado.",
      });
    }

    req.context.me = user;

    return next();
  } catch (error) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Token inválido ou expirado.",
    });
  }
};

export default authMiddleware;