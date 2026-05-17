import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "15m",
    },
  );
};

const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

const getRefreshTokenExpirationDate = () => {
  const days = Number(process.env.REFRESH_TOKEN_EXPIRATION_DAYS || 7);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + days);

  return expiresAt;
};

export {
  generateAccessToken,
  generateRefreshToken,
  getRefreshTokenExpirationDate,
};