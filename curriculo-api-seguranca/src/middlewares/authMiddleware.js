const jwt = require("jsonwebtoken");
const pool = require("../config/db");

async function authMiddleware(req, res, next) {
  const method = req.method;
  const path = req.path;

  const isPublicGet = method === "GET" && path !== "/session";

  const isLoginRoute = method === "POST" && path === "/session";
  const isRefreshRoute = method === "POST" && path === "/session/refresh";
  const isCreateUserRoute =
    method === "POST" && (path === "/usuarios" || path === "/users");

  const isPublicRoute =
    isPublicGet || isLoginRoute || isRefreshRoute || isCreateUserRoute;

  if (isPublicRoute) {
    return next();
  }

  const authorization = req.headers.authorization;

  if (!authorization) {
    return next();
  }

  if (!authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      erro: "Token deve estar no formato Bearer <TOKEN>",
    });
  }

  const token = authorization.replace("Bearer ", "").trim();

  if (!token || token === "undefined" || token === "null") {
    return res.status(401).json({
      erro: "Token inválido ou expirado",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const result = await pool.query(
      "SELECT id, nome, login, criado_em FROM usuarios WHERE id = $1",
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        erro: "Usuário não encontrado",
      });
    }

    req.user = result.rows[0];

    return next();
  } catch (error) {
    return res.status(401).json({
      erro: "Token inválido ou expirado",
    });
  }
}

module.exports = authMiddleware;