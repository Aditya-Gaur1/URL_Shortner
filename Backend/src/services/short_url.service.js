import { generateShortCode } from "../utils/helper.js";
import {
  getCustomShortUrl,
  saveShortUrl,
  getShortUrlsByUserId,
} from "../dao/short_url.js";

export const createShortUrlServiceWithOutUser = async (originalUrl) => {
  try {
    console.log(`🔗 Creating short URL for: ${originalUrl}`);

    const shortCode = generateShortCode();

    await saveShortUrl(shortCode, originalUrl);

    console.log(`✅ Saved short URL with code: ${shortCode}`);

    return shortCode;
  } catch (error) {
    console.error(
      "❌ Error while creating short URL without user:",
      error.message,
    );

    throw error;
  }
};

export const createShortUrlServiceWithUser = async (
  originalUrl,
  userId,
  slug = null,
) => {
  try {
    console.log(`🔗 Creating short URL for: ${originalUrl}`);

    const shortCode = slug || generateShortCode();

    if (slug) {
      const exists = await getCustomShortUrl(slug);

      if (exists) {
        throw new Error("This custom URL already exists");
      }
    }

    await saveShortUrl(shortCode, originalUrl, userId);

    console.log(`✅ Saved short URL with code: ${shortCode}`);

    return shortCode;
  } catch (error) {
    console.error(
      "❌ Error while creating short URL with user:",
      error.message,
    );

    throw error;
  }
};
// ======================================
// GET ALL URLS FOR CURRENT USER
// ======================================

export const getUserShortUrls = async (userId) => {
  try {
    console.log(`🔍 Fetching URLs for user: ${userId}`);

    const urls = await getShortUrlsByUserId(userId);

    console.log(`✅ Found ${urls.length} URLs for user`);

    return urls;
  } catch (error) {
    console.error("❌ Error while getting user's short URLs:", error.message);

    throw error;
  }
};
