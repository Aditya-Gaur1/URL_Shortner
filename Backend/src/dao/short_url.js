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

    const shortUrlDocument = new shortUrl({
        full_url: originalUrl,
        short_url: shortCode
    });

    if (userId) {
        shortUrlDocument.user_id = userId;
    }

    await shortUrlDocument.save();

    console.log(`💾 URL saved to database: ${shortCode}`);
};