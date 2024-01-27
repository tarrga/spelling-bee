require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const wordRoutes = require('./routes/wordRoute');
const userRoutes = require('./routes/userRoute');

// express app
const app = express();

// middleware
// cors policy
app.use(cors());

// for receiving json data
app.use(express.json());
// for receiving form data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  next();
});

// routes
app.use('/api/words', wordRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

// listen to app
app.listen(3000, 'spellingbee.gabortarr.com', () => {
  console.log('run on port 3000');
});
