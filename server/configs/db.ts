import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        
        if (!mongoUri) {
            throw new Error('MONGODB_URI is not defined in .env file');
        }

        mongoose.connection.on('connected', () => console.log('MongoDB connected'));
        mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
        
        await mongoose.connect(mongoUri);
        console.log('MongoDB connection successful');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process if connection fails
    }
}

export default connectDB;
 