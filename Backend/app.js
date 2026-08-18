import express from "express";
import dotenv from "dotenv";

import connectDB from "./src/config/mongo.config.js";
import shortUrlRoutes from "./src/routes/shortUrl.route.js";
import { redirectToShort } from "./src/controller/shortUrl.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/create", shortUrlRoutes);

// Redirect to original URL
app.get("/:shortCode", redirectToShort);

// Start server
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log("=================================");
            console.log("🚀 URL Shortener Server Started");
            console.log(`🌐 Server: http://localhost:${PORT}`);
            console.log("🗄️ MongoDB: Connected");
            console.log("=================================");
        });

    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();