const mongoose = require("mongoose");
require("dotenv").config();
mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Locally");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); // Exit process if connection fails
  }
};

module.exports = connectDB;

// "test": "jest --coverage --config ./jest.config.js --detectOpenHandles",
//     "coverage": "cross-env NODE_ENV=development jest --coverage --runInBand --detectOpenHandles --forceExit"
