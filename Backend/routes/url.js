import express from 'express';
import Url from '../models/Url';
import { nanoid } from 'nanoid';

const router = express.Router();

router.post("/shorten", async (req ,res) =>{
    try{
        const{ originalUrl } = req.body;

        if(!originalUrl){
            return res.status(400).json({ error : "URL is required"})
        }
    } catch(error){
        console.log(error);
        res.status(500).json({ error : "Server error"});
    }
})