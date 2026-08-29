// DAO = Data Access Object
//
// The DAO layer is responsible ONLY for communicating with the database.
//
// Service → decides WHAT should happen
// DAO     → decides HOW to interact with the database
//
// Example:
// Service says: "Save this shortened URL"
// DAO handles: "Create the MongoDB document and save it"
//
// This keeps database queries separate from business logic
// and makes the project easier to maintain as it grows.


import shortUrl from "../models/shortUrl.model.js";

export const saveShortUrl = async (shortCode, originalUrl, userId) => {
    try {
        const shortUrlDocument = new shortUrl({
            full_url: originalUrl,
            short_url: shortCode
        });

        if (userId) {
            shortUrlDocument.user = userId;
        }

        await shortUrlDocument.save();

        console.log(`💾 URL saved to database: ${shortCode}`);

    } catch (error) {
        console.error(
            "❌ Error while saving short URL:",
            error.message
        );

        throw error;
    }
};


export const getShortUrlAndIncrementClicks = async (shortCode) => {
    try {
        const url = await shortUrl.findOneAndUpdate(
            { short_url: shortCode },
            { $inc: { clicks: 1 } },
            { new: true }
        );

        console.log("Short code:", shortCode);
        console.log("Updated document:", url);

        return url;

    } catch (error) {
        console.error(
            "❌ Error while getting short URL:",
            error.message
        );

        throw error;
    }
};