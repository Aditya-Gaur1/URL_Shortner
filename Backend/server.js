import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from "cors";
import dns from "node:dns";
// Use Google's DNS servers
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
}));
app.use(express.json());

app.get("/", (req , res) => {
    res.send("Hello World")
})

mongoose.connect(process.env.MONGo_URI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT , ()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.error("Error connecting to MongoDB", err);
})