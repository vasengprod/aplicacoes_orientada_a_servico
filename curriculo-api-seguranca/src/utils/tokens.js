const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function generateAccessToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      login: user.login,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "15m",
    }
  );
}

function generateRefreshToken() {
  return crypto.randomBytes(64).toString("hex");
}

function getRefreshTokenExpirationDate() {
  const days = Number(process.env.REFRESH_TOKEN_EXPIRATION_DAYS || 7);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);

  return expiresAt;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpirationDate,
};