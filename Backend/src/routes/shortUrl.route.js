import express from "express";

import {
  createShortUrl,
  get_my_urls,
} from "../controller/shortUrl.controller.js";

const router = express.Router();

// Create a new short URL
router.post("/", createShortUrl);

// Get all URLs belonging to the logged-in user
router.get("/my-urls", get_my_urls);

export default router;