import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://auth-login-frontend.vercel.app',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))
app.use("/api/auth", authRoutes);

app.listen(port, () => {
    console.log("Server is running on port : " + port);
    connectDB();
    
});



