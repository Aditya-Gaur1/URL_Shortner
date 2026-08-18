import { generateShortCode } from "../utils/helper.js";
import { saveShortUrl } from "../dao/short_url.js";

export const createShortUrlServiceWithOutUser = async (originalUrl) => {
    console.log(`🔗 Creating short URL for: ${originalUrl}`);

    const shortCode = generateShortCode();

    await saveShortUrl(shortCode,originalUrl);

    console.log(`✅ Saved short URL with code: ${shortCode}`);

    return shortCode;
};
export const createShortUrlServiceWithUser = async (originalUrl , userId) => {
    console.log(`🔗 Creating short URL for: ${originalUrl}`);

    const shortCode = generateShortCode();

    await saveShortUrl(shortCode, originalUrl, userId);

    console.log(`✅ Saved short URL with code: ${shortCode}`);

    return shortCode;
};