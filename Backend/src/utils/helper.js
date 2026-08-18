import { nanoid } from "nanoid";

/**
 * Generates a unique short code.
 * @param {number} length - Length of the generated code.
 * @returns {string} Generated short code.
 */
export const generateShortCode = (length = 7) => {
    return nanoid(length);
};