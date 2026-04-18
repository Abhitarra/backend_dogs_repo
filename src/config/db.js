const mongoose = require("mongoose");
const logger = require("../utils/logger");
const insertData = require("../controllers/dog.controller").seedDatabase;
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      logger.info("MongoDB Connected");
      insertData();
    })
    .catch((err) => {
      logger.error("MongoDB connection failed: " + err.message);
      process.exit(1); // 👈 important
    });
};

module.exports = connectDB;
