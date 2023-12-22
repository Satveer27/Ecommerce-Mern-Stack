import express from 'express';
import dbConnect from '../config/dbConnect.js';
import dotenv from 'dotenv';
import userRoutes from '../routes/usersRoute.js';

//Have access to variable in env file
dotenv.config();

//Database connection
dbConnect();
const app = express();

//pass incoming data
app.use(express.json())


//routes
//uses router when appropriate pattern path is called
app.use('/', userRoutes);

export default app;