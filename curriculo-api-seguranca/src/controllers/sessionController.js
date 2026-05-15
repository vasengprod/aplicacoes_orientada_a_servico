const bcrypt = require("bcryptjs");
const pool = require("../config/db");

const {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpirationDate,
} = require("../utils/tokens");

async function login(req, res) {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({
        erro: "Login e senha são obrigatórios",
      });
    }

    const userResult = await pool.query(
      "SELECT * FROM usuarios WHERE login = $1",
      [login]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        erro: "Credenciais inválidas",
      });
    }

    const user = userResult.rows[0];

    const senhaValida = await bcrypt.compare(senha, user.senha_hash);

    if (!senhaValida) {
      return res.status(401).json({
        erro: "Credenciais inválidas",
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    const expiresAt = getRefreshTokenExpirationDate();

    await pool.query(
      `INSERT INTO refresh_tokens
       (usuario_id, token, expira_em)
       VALUES ($1, $2, $3)`,
      [user.id, refreshToken, expiresAt]
    );

    return res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao fazer login",
      detalhe: error.message,
    });
  }
}

async function getSession(req, res) {
  return res.json({
    usuario: req.user,
  });
}

async function logout(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        erro: "Refresh token é obrigatório",
      });
    }

    await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [
      refreshToken,
    ]);

    return res.json({
      mensagem: "Logout realizado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao fazer logout",
      detalhe: error.message,
    });
  }
}

async function refresh(req, res) {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        erro: "Refresh token é obrigatório",
      });
    }

    const tokenResult = await pool.query(
      "SELECT * FROM refresh_tokens WHERE token = $1",
      [refreshToken]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(401).json({
        erro: "Refresh token inválido",
      });
    }

    const storedToken = tokenResult.rows[0];

    if (new Date(storedToken.expira_em) < new Date()) {
      await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [
        refreshToken,
      ]);

      return res.status(401).json({
        erro: "Refresh token expirado",
      });
    }

    const userResult = await pool.query(
      "SELECT id, nome, login, criado_em FROM usuarios WHERE id = $1",
      [storedToken.usuario_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        erro: "Usuário não encontrado",
      });
    }

    const user = userResult.rows[0];
    const oldExpirationDate = storedToken.expira_em;

    await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [
      refreshToken,
    ]);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken();

    await pool.query(
      `INSERT INTO refresh_tokens
       (usuario_id, token, expira_em)
       VALUES ($1, $2, $3)`,
      [user.id, newRefreshToken, oldExpirationDate]
    );

    return res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao renovar sessão",
      detalhe: error.message,
    });
  }
}

module.exports = {
  login,
  getSession,
  logout,
  refresh,
};