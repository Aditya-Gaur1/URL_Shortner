import {
  getUserShortUrls,
  deleteUserShortUrl,
} from "../services/short_url.service.js";

// ======================================
// GET ALL URLS FOR CURRENT USER
// ======================================

export const get_user_short_urls = async (req, res) => {
  try {
    // User should already be attached
    // by our authentication middleware

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
// ======================================
// DELETE URL FOR CURRENT USER
// ======================================

export const delete_user_short_url = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const { id } = req.params;

    await deleteUserShortUrl(id, req.user._id);

    return res.status(200).json({
      success: true,
      message: "URL deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error while deleting URL:", error.message);

    if (error.message === "URL not found") {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
