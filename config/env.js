import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET_KEY;
export const DB_URL = process.env.DB_URL;