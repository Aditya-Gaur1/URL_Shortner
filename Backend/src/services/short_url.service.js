import { generateShortCode } from "../utils/helper.js";
import { saveShortUrl } from "../dao/short_url.js";

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
            error.message
        );

        throw error;
    }
};

export const createShortUrlServiceWithUser = async (originalUrl, userId) => {
    try {
        console.log(`🔗 Creating short URL for: ${originalUrl}`);

        const shortCode = generateShortCode();

        await saveShortUrl(shortCode, originalUrl, userId);

        console.log(`✅ Saved short URL with code: ${shortCode}`);

        return shortCode;

    } catch (error) {
        console.error(
            "❌ Error while creating short URL with user:",
            error.message
        );

        throw error;
    }
};