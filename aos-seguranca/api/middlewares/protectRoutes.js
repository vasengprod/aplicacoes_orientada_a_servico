const protectRoutes = (req, res, next) => {
  const method = req.method;
  const path = req.path;

  const isLoginRoute = method === "POST" && path === "/session";
  const isRefreshRoute = method === "POST" && path === "/session/refresh";
  const isCreateUserRoute = method === "POST" && path === "/users";

  const isWhitelisted = isLoginRoute || isRefreshRoute || isCreateUserRoute;

  if (isWhitelisted) {
    return next();
  }

  const isGetSession = method === "GET" && path === "/session";

  if (isGetSession && !req.context.me) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Você precisa estar autenticado para acessar essa rota.",
    });
  }

  const isWriteMethod =
    method === "POST" || method === "PUT" || method === "DELETE";

  if (isWriteMethod && !req.context.me) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Você precisa estar autenticado para realizar essa operação.",
    });
  }

  return next();
};

export default protectRoutes;