import { connect } from 'mongoose';
import { DB_URL } from '../config/env.js';

const connectDB = async () => {
    try {
        await connect(DB_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;