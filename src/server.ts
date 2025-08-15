import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
import { clerkMiddleware } from '@clerk/express';
import morgan from 'morgan';
import authRouter from './routes/authRouter';
import propertyRouter from './routes/propertyRouter';
import searchRouter from './routes/searchRouter';

dotenv.config();

connectDB()

const app = express()

// Activar CORS
app.use(cors(corsConfig));

// Clerk Middleware - MUST be before your routes
app.use(clerkMiddleware({
    // Optional: Configure Clerk middleware
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
}))
// Logs
app.use(morgan("dev"));

// Leer datos de formularios
app.use(express.json())

// Routes
app.use("/api/auth", authRouter);
app.use("/api/property", propertyRouter);
app.use("/api/search", searchRouter);

export default app