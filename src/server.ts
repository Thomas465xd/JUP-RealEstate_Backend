import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
import morgan from 'morgan';
import authRouter from './routes/authRouter';

dotenv.config();

connectDB()

const app = express()

// Activar CORS
app.use(cors(corsConfig));

// Logs
app.use(morgan("dev"));

// Leer datos de formularios
app.use(express.json())

// Routes
app.use("/api/auth", authRouter);

export default app