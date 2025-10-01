import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function (origin, callback) {
        const whitelist = [process.env.FRONTEND_URL, process.env.WWW_FRONTEND_URL, "http://localhost:3000"];

        // Allow requests with no origin (e.g., Postman, cURL)
        if (!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin ${origin} not allowed`);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Optional: allow cookies if needed
};