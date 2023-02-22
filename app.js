require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect')
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const authentificate = require('./middleware/authentication');

const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/not-found');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authentificate, jobsRouter);

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI).then(() => {
      console.log('You are connected to DB');
    })
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();