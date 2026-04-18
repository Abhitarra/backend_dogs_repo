require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const dogRoutes = require('./routes/dog.routes');
const errorHandler = require('./middlewares/error.middleware');
const connectDB = require('./config/db');

const app = express();

app.use(cors({
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(compression());

app.use("/auth", require("./routes/auth.routes"));
app.use('/api/dogs', dogRoutes);

app.get('/', (req, res) => {
  res.send('Dogs API is running 🚀');
});

app.use(errorHandler);

module.exports = app;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});



