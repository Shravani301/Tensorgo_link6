// config/db.js
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://<Username>:<password>@cluster0.25gm8re.mongodb.net/<Database>?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
