import mongoose from "mongoose";

// Schema defines the structure of documents stored in MongoDB
const urlSchema = new mongoose.Schema({

    // Stores the original URL entered by the user
    originalUrl: {
        type: String,
        required: true
    },

    // Stores the unique short ID (e.g., abc123X)
    // 'unique' ensures no two URLs have the same short ID
    shortId: {
        type: String,
        required: true,
        unique: true
    },

    // Tracks how many times the shortened URL has been visited
    // Starts from 0 and increments on every redirect
    clicks: {
        type: Number,
        default: 0
    }

},
{
    // Automatically adds createdAt and updatedAt fields
    timestamps: true
});

// Creates the "Url" model using the schema.
// This model is used to perform CRUD operations on the "urls" collection.
export default mongoose.model("Url", urlSchema);