import bcrypt from "bcryptjs";

import {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpirationDate,
} from "../utils/tokens";

const removePasswordHash = (user) => {
  const plainUser = user.toJSON ? user.toJSON() : user;

  delete plainUser.passwordHash;

  return plainUser;
};

const login = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).send({
      error: "Bad Request",
      message: "Login e senha são obrigatórios.",
    });
  }

  const user = await req.context.models.User.findByLogin(login);

  if (!user) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Credenciais inválidas.",
    });
  }

  const passwordIsValid = await bcrypt.compare(password, user.passwordHash);

  if (!passwordIsValid) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Credenciais inválidas.",
    });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  const expiresAt = getRefreshTokenExpirationDate();

  await req.context.models.RefreshToken.create({
    token: refreshToken,
    expiresAt,
    userId: user.id,
  });

  return res.status(200).send({
    accessToken,
    refreshToken,
  });
};

const getSession = async (req, res) => {
  const user = await req.context.models.User.findByPk(req.context.me.id);

  if (!user) {
    return res.status(404).send();
  }

  return res.status(200).send(removePasswordHash(user));
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).send({
      error: "Bad Request",
      message: "Refresh token é obrigatório.",
    });
  }

  await req.context.models.RefreshToken.destroy({
    where: {
      token: refreshToken,
    },
  });

  return res.status(200).send({
    message: "Logout realizado com sucesso.",
  });
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).send({
      error: "Bad Request",
      message: "Refresh token é obrigatório.",
    });
  }

  const storedRefreshToken = await req.context.models.RefreshToken.findOne({
    where: {
      token: refreshToken,
    },
  });

  if (!storedRefreshToken) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Refresh token inválido.",
    });
  }

  if (storedRefreshToken.expiresAt < new Date()) {
    await storedRefreshToken.destroy();

    return res.status(401).send({
      error: "Unauthorized",
      message: "Refresh token expirado.",
    });
  }

  const user = await req.context.models.User.findByPk(
    storedRefreshToken.userId,
  );

  if (!user) {
    return res.status(401).send({
      error: "Unauthorized",
      message: "Usuário não encontrado.",
    });
  }

  const oldExpirationDate = storedRefreshToken.expiresAt;

  await storedRefreshToken.destroy();

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken();

  await req.context.models.RefreshToken.create({
    token: newRefreshToken,
    expiresAt: oldExpirationDate,
    userId: user.id,
  });

  return res.status(200).send({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
};

export default {
  login,
  getSession,
  logout,
  refresh,
};