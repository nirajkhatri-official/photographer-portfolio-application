import dotenv from "dotenv";
import {
  generateAccessToken,
  validateAccessToken,
  validateRefreshToken,
} from "../utils/jwtUtils.js";
dotenv.config();

const validateToken = (req, res, next) => {
  const accessToken = req?.cookies["access-token"];
  const refreshToken = req?.cookies["refresh-token"];

  if (!accessToken && !refreshToken)
    return res.status(401).json({
      error: true,
      message: "Access denied. No tokens provided.",
    });

  const validToken = validateAccessToken(accessToken);

  if (validToken) {
    req.authenticated = true;
    req.userId = validToken?.id;
    return next();
  }
  if (!refreshToken) {
    return res.status(401).json({
      error: true,
      message: "Access denied. No refresh token provided.",
    });
  }
  refreshTokens(req, res, next);
};

const refreshTokens = (req, res, next) => {
  const refreshToken = req.cookies["refresh-token"];

  const validRefreshToken = validateRefreshToken(refreshToken);
  if (!validRefreshToken) {
    return res.status(401).json({
      error: true,
      message: "Invalid or expired refresh token.",
    });
  }
  const newAccessToken = generateAccessToken(validRefreshToken.id);

  res.cookie("access-token", newAccessToken, {
    httpOnly: true,
  });

  req.authenticated = true;
  req.user = validRefreshToken?.id;

  return next();
};

//exporting module
export { validateToken, refreshTokens };
