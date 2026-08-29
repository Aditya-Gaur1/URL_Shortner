import { findUserById } from "../dao/user.dao.js";
import { verifyAccessToken } from "./helper.js";

export const attachUser = async (req, res, next) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next();
  }

  try {
    const decoded = verifyAccessToken(token);

    const user = await findUserById(decoded.id);

    if (!user) {
      return next();
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("❌ attachUser error:", error.message);

    next();
  }
};
