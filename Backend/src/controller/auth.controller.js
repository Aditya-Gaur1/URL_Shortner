import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/auth.service.js";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../config/config.js";

import { signAccessToken, verifyRefreshToken } from "../utils/helper.js";

// ===============================
// REGISTER
// ===============================

export const register_user = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { accessToken, refreshToken } = await registerUser(
      name,
      email,
      password,
    );

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("❌ Registration error:", error.message);

    // User already exists
    if (error.message === "User already exists") {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Invalid password
    if (error.message.startsWith("Password must be")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // Unexpected error
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ===============================
// LOGIN
// ===============================

export const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await loginUser(email, password);

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Credentials",
    });
  }
};

// ===============================
// REFRESH ACCESS TOKEN
// ===============================

export const refresh_token = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);

    const accessToken = signAccessToken({
      id: decoded.id,
    });

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
};

// ===============================
// LOGOUT
// ===============================

export const logout_user = async (req, res) => {
  res.clearCookie("accessToken", accessTokenCookieOptions);

  res.clearCookie("refreshToken", refreshTokenCookieOptions);

  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
// ===============================
// GET CURRENT USER
// ===============================

export const get_current_user = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const user = await getCurrentUser(req.user._id);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("❌ Get current user error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
