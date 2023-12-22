import express from 'express';
import dbConnect from '../config/dbConnect.js';
import dotenv from 'dotenv';

//Have access to variable in env file
dotenv.config();

//Database connection
dbConnect();

const app = express();

export default app;