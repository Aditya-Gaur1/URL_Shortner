import { createShortUrlServiceWithOutUser } from "../services/short_url.service.js";
import { getShortUrlAndIncrementClicks } from "../dao/short_url.js";

export const createShortUrl = async (req, res) => {
    try {
        const { url: originalUrl } = req.body;

        console.log(`🔗 Received URL: ${originalUrl}`);

        const shortCode =
            await createShortUrlServiceWithOutUser(originalUrl);

        const shortUrl = process.env.APP_URL + shortCode;

        console.log(`✅ Short URL created: ${shortUrl}`);

        res.send(shortUrl);

    } catch (error) {
        console.error(
            "❌ Error while creating short URL:",
            error.message
        );

        return res.status(500).send("Internal Server Error");
    }
};


export const redirectToShort = async (req, res) => {
    try {
        const { shortCode } = req.params;

        console.log(`🔍 Looking for short URL: ${shortCode}`);

        const urlDocument =
            await getShortUrlAndIncrementClicks(shortCode);

        if (!urlDocument) {
            console.log(`❌ Short URL not found: ${shortCode}`);

            return res.status(404).send(
                "Short URL not found"
            );
        }

        console.log(
            `↗️ Redirecting to: ${urlDocument.full_url}`
        );

        console.log(
            `📊 Clicks: ${urlDocument.clicks}`
        );

        return res.redirect(urlDocument.full_url);

    } catch (error) {
        console.error(
            "❌ Error while redirecting:",
            error.message
        );

        return res.status(500).send(
            "Internal Server Error"
        );
    }
};