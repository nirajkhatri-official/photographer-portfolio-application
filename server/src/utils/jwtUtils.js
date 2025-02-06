import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_EXPIRATION = "15m";
const REFRESH_TOKEN_EXPIRATION = "7d";

export const generateAccessToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    }
  );
};

export const generateRefreshToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    }
  );
};

export const validateAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

export const validateRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};
