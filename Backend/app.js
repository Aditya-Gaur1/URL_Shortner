import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.config.js"; 
import shortUrlRoutes from "./src/routes/shortUrl.route.js";
import { redirectToShort } from "./src/controller/shortUrl.controller.js";
import auth_routes from "./src/routes/auth.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import { attachUser } from "./src/utils/attachUser.js";
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(attachUser)
// Routes
app.use("/api/auth", auth_routes)
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
        console.error(error.stack);

        process.exit(1);
    }
};

startServer();