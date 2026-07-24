import express from "express";
import Url from "../models/Url.js";
import { nanoid } from "nanoid";

// Creates a new Express router to define URL-related routes
const router = express.Router();

// ======================================================
// POST /shorten
// Creates a new shortened URL
// ======================================================
router.post("/shorten", async (req, res) => {
    try {
        // Extract the original URL sent from the frontend
        const { originalUrl } = req.body;

        // Check if the URL is provided
        if (!originalUrl) {
            return res.status(400).json({ error: "URL is required" });
        }

        // Validate that the entered string is a valid URL
        try {
            new URL(originalUrl);
        } catch {
            return res.status(400).json({ error: "Invalid URL" });
        }

        // Generate a unique short ID
        let shortId;
        let exists = true;

        // Keep generating IDs until a unique one is found
        while (exists) {
            shortId = nanoid(7);
            exists = await Url.findOne({ shortId });
        }

        // Save the URL mapping in MongoDB
        const url = await Url.create({
            shortId,
            originalUrl
        });

        // Send the shortened URL back to the frontend
        res.json({
            shortId: url.shortId,
            shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// ======================================================
// GET /:shortId
// Redirects the user to the original URL
// ======================================================
router.get("/:shortId", async (req, res) => {
    try {
        // Get the short ID from the URL parameter
        const { shortId } = req.params;

        // Find the matching document in MongoDB
        const url = await Url.findOne({ shortId });

        // Return 404 if the short URL doesn't exist
        if (!url)
            return res.status(404).json({ error: "URL not found" });

        // Increase click count every time the link is visited
        url.clicks += 1;
        await url.save();

        // Redirect the user to the original URL
        return res.redirect(url.originalUrl);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Export the router so it can be used in server.js
export default router;