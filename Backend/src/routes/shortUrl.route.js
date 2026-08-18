import express from "express";

import { createShortUrl } from "../controller/shortUrl.controller.js";

const router = express.Router();

// Create a new short URL
router.post("/", createShortUrl);

export default router;