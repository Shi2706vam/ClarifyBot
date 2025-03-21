import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";
import router from "./routes/authRoutes.js";
import userRouter from './routes/userRoutes.js';

// const express = require('express')
// const dotenv = require('dotenv').config()
// const cors = require('cors')
// const {mongoose} = require('mongoose')
// const cookieParser = require('cookie-parser')

const app = express();
const port = process.env.PORT || 8000;
connectDB();

const allowedOrigins = ['http://localhost:5173']

//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))
app.use(express.urlencoded({extended: false}))

// api endpoints
app.get('/', (req, res) => res.send("API Working"));

app.use('/api/auth', router)
app.use('/api/user', userRouter)

app.listen(port, () => console.log(`Server is running on PORT: ${port}`))