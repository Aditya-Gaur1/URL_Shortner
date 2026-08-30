import express from "express";

import {
  get_user_short_urls,
  delete_user_short_url,
} from "../controller/dashboard.controller.js";

const router = express.Router();

// ======================================
// GET ALL URLS FOR CURRENT USER
// ======================================

router.get("/urls", get_user_short_urls);
// ======================================
// DELETE URL
// ======================================

router.delete("/urls/:id", delete_user_short_url);
export default router;
