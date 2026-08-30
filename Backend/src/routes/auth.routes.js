import express from "express";
import passport from "../config/google.config.js";

import {
  register_user,
  login_user,
  refresh_token,
  logout_user,
  get_current_user,
} from "../controller/auth.controller.js";

import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../config/config.js";

const router = express.Router();

// ===============================
// NORMAL AUTH
// ===============================

router.post("/register", register_user);

router.post("/login", login_user);

router.post("/refresh", refresh_token);

router.post("/logout", logout_user);

router.get("/me", get_current_user);

// ===============================
// GOOGLE OAUTH
// ===============================

// Start Google authentication

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: true,
  }),
);

// Google OAuth callback

router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,
  }),

  (req, res) => {
    try {
      const { accessToken, refreshToken } = req.user;

      // Store JWT tokens in HTTP-only cookies

      res.cookie("accessToken", accessToken, accessTokenCookieOptions);

      res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

      console.log("✅ Google login successful");

      console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

      // Redirect back to React

      return res.redirect(`${process.env.FRONTEND_URL}/`);
    } catch (error) {
      console.error("❌ Google callback error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Google authentication failed",
      });
    }
  },
);

export default router;
