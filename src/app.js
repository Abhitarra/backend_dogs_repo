require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require("express-rate-limit");

const dogRoutes = require('./routes/dog.routes');
const errorHandler = require('./middlewares/error.middleware');
const connectDB = require('./config/db');
const logger = require('./utils/logger');


// apply to all routes
const app = express();

// Global limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // max requests
  message: {
    success: false,
    message: "Too many requests, please try again later"
  }
});


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(limiter);

app.use("/auth", require("./routes/auth.routes"));
app.use('/dogs', dogRoutes);

app.get('/', (req, res) => {
  res.send('Dogs API is running 🚀');
});

app.use(errorHandler);

module.exports = app;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  logger.info(`Server running on port ${PORT}`);
});



