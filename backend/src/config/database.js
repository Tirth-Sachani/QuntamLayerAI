require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // If no explicit URI is provided, use a local fallback or a placeholder
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/quntam-layer-ai-agency';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
