import bcrypt from "bcrypt";

import {
  findUserByEmail,
  findUserById,
  createUser,
  findUserByGoogleId,
  createGoogleUser,
  linkGoogleAccount,
} from "../dao/user.dao.js";

import { signAccessToken, signRefreshToken } from "../utils/helper.js";

export const registerUser = async (name, email, password) => {
  const user = await findUserByEmail(email);

  if (user) {
    throw new Error("User already exists");
  }

  // Validate plain password BEFORE hashing
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be 8-16 characters and contain at least one uppercase letter, one lowercase letter, and one symbol.",
    );
  }

  const newUser = await createUser(name, email, password);

  // Create access token
  const accessToken = signAccessToken({
    id: newUser._id,
  });

  // Create refresh token
  const refreshToken = signRefreshToken({
    id: newUser._id,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const loginUser = async (email, password) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid Credentials");
  }

  // Create access token
  const accessToken = signAccessToken({
    id: user._id,
  });

  // Create refresh token
  const refreshToken = signRefreshToken({
    id: user._id,
  });

  return {
    accessToken,
    refreshToken,
  };
};

// Get currently logged-in user
export const getCurrentUser = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
// ======================================
// GOOGLE OAUTH LOGIN
// ======================================

export const loginWithGoogle = async (googleId, name, email) => {
  // 1. Check whether this Google account already exists

  let user = await findUserByGoogleId(googleId);

  if (user) {
    console.log("✅ Existing Google user found");
  } else {
    // 2. Google account doesn't exist
    // Check whether this email already belongs to a user

    user = await findUserByEmail(email);

    if (user) {
      // 3. Existing local account
      // Link Google account to it

      user = await linkGoogleAccount(user._id, googleId);

      console.log("🔗 Google account linked to existing user");
    } else {
      // 4. Completely new user
      // Create a new Google user

      user = await createGoogleUser(name, email, googleId);

      console.log("👤 New Google user created");
    }
  }

  // 5. Create YOUR access token

  const accessToken = signAccessToken({
    id: user._id,
  });

  // 6. Create YOUR refresh token

  const refreshToken = signRefreshToken({
    id: user._id,
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};
