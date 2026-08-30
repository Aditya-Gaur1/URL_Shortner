import {
  createShortUrlServiceWithOutUser,
  createShortUrlServiceWithUser,
  getUserShortUrls,
} from "../services/short_url.service.js";

import { getShortUrlAndIncrementClicks } from "../dao/short_url.js";

export const createShortUrl = async (req, res) => {
  try {
    const data = req.body;

    console.log(`🔗 Received URL: ${data.url}`);

    // Add https:// if protocol is missing
    let url = data.url;

    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }

    let shortCode;

    if (req.user) {
      shortCode = await createShortUrlServiceWithUser(
        url,
        req.user._id,
        data.slug,
      );
    } else {
      shortCode = await createShortUrlServiceWithOutUser(url);
    }

    console.log(`🎯 Short code returned to controller: ${shortCode}`);

    const shortUrl = `${process.env.APP_URL}${shortCode}`;

    console.log(`✅ Short URL created: ${shortUrl}`);

    return res.status(201).json({
      success: true,
      shortUrl: shortUrl,
    });
  } catch (error) {
    console.error("❌ Error while creating short URL:", error.message);

    // 🔴 Custom slug already exists
    if (error.message === "This custom URL already exists") {
      return res.status(409).json({
        success: false,
        message: "This custom URL already exists",
      });
    }

    // 🔴 Other unexpected errors
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const redirectToShort = async (req, res) => {
  try {
    const { shortCode } = req.params;

    console.log(`🔍 Looking for short URL: ${shortCode}`);

    const urlDocument = await getShortUrlAndIncrementClicks(shortCode);

    if (!urlDocument) {
      console.log(`❌ Short URL not found: ${shortCode}`);

      return res.status(404).send("Short URL not found");
    }

    console.log(`↗️ Redirecting to: ${urlDocument.full_url}`);

    console.log(`📊 Clicks: ${urlDocument.clicks}`);

    return res.redirect(urlDocument.full_url);
  } catch (error) {
    console.error("❌ Error while redirecting:", error.message);

    return res.status(500).send("Internal Server Error");
  }
};
// ======================================
// GET ALL URLS FOR CURRENT USER
// ======================================

export const get_my_urls = async (req, res) => {
  try {
    // User should already be attached by attachUser middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const urls = await getUserShortUrls(req.user._id);

    return res.status(200).json({
      success: true,
      urls,
    });
  } catch (error) {
    console.error("❌ Error while getting user's URLs:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
