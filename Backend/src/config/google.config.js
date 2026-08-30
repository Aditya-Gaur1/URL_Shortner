import passport from "passport";
import crypto from "crypto";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { loginWithGoogle } from "../services/auth.service.js";

// ======================================
// OAUTH STATE STORE
// ======================================

const googleStateStore = {
  // Generate and store state before
  // redirecting the user to Google

  store: (req, state, meta, callback) => {
    const stateToken = crypto.randomBytes(32).toString("hex");

    resCookie(req, stateToken);

    callback(null, stateToken);
  },

  // Verify state when Google redirects
  // the user back to our callback

  verify: (req, providedState, meta, callback) => {
    const storedState = req.cookies?.google_oauth_state;

    if (!storedState) {
      return callback(null, false, { message: "OAuth state missing" });
    }

    if (storedState !== providedState) {
      return callback(null, false, { message: "Invalid OAuth state" });
    }

    // State can only be used once

    resClearCookie(req);

    callback(null, true);
  },
};

// ======================================
// STATE COOKIE HELPERS
// ======================================

const resCookie = (req, state) => {
  req.res.cookie("google_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60 * 1000,
  });
};

const resClearCookie = (req) => {
  req.res.clearCookie("google_oauth_state", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
};

// ======================================
// GOOGLE STRATEGY
// ======================================

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL: process.env.GOOGLE_CALLBACK_URL,

      // Use our custom state store
      state: true,
      store: googleStateStore,
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google profile:", profile);

        const googleId = profile.id;

        const name = profile.displayName;

        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(
            new Error("Google account does not provide an email"),
            null,
          );
        }

        // Find or create the user
        // and generate our application's JWT tokens

        const result = await loginWithGoogle(googleId, name, email);

        return done(null, result);
      } catch (error) {
        console.error("❌ Google authentication error:", error.message);

        return done(error, null);
      }
    },
  ),
);

export default passport;
