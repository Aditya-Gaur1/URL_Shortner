import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id).select("-password");
};

export const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return newUser;
};

// ======================================
// GOOGLE OAUTH
// ======================================

// Find user using Google ID

export const findUserByGoogleId = async (googleId) => {
  return await User.findOne({ googleId });
};

// Create a user through Google OAuth

export const createGoogleUser = async (name, email, googleId) => {
  const newUser = new User({
    name,
    email,
    googleId,
    authProvider: "google",
  });

  await newUser.save();

  return newUser;
};

// Link Google account to an existing user

export const linkGoogleAccount = async (userId, googleId) => {
  return await User.findByIdAndUpdate(
    userId,
    {
      googleId,
      authProvider: "google",
    },
    {
      new: true,
    },
  );
};
