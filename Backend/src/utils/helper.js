import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken";

export const generateShortCode = (length = 7) => {
  try {
    return nanoid(length);
  } catch (error) {
    console.error("❌ Error while generating short code:", error.message);

    throw error;
  }
};

// ===============================
// ACCESS TOKEN
// ===============================

export const signAccessToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const verifyAccessToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_SECRET);
};

// ===============================
// REFRESH TOKEN
// ===============================

export const signRefreshToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyRefreshToken = (token) => {
  return jsonwebtoken.verify(token, process.env.JWT_REFRESH_SECRET);
};
