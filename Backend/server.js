import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import dns from "node:dns";
import urlRoutes from "./routes/url.js";

// Use Google's DNS servers for reliable DNS resolution
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Load environment variables from the .env file
dotenv.config();

// Create an Express application
const app = express();

// Enable CORS so the frontend can communicate with the backend
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
    })
);

// Parse incoming JSON request bodies
app.use(express.json());

// Register all URL-related routes
// Example:
// POST /shorten
// GET /:shortId
app.use("/", urlRoutes);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGo_URI)
    .then(() => {
        console.log("Connected to MongoDB");

        // Start the server only after a successful database connection
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        // Log database connection errors
        console.error("Error connecting to MongoDB", err);
    });