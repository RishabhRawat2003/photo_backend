import express from 'express'
import cors from 'cors'

const app = express()

// Define the allowed origins
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:8000",
    "https://photo-frontend-seven.vercel.app",
    "https://photo-backend-eta.vercel.app"
];

// CORS Middleware for Express
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                // If the origin isn't in the allowed list
                return callback(new Error("Not allowed by CORS"), false);
            }
            return callback(null, true);
        },
        credentials: true, // Enable credentials (cookies, etc.)
    })
);

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(express.static('public'))

app.get('/health', (req, res) => {
    res.status(200).send('OK'); // Health check endpoint
});

// Admin Routes
import adminRouter from './routes/admin.routes.js'
app.use("/api/v1/admin", adminRouter)

export { app }