require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

//connectDB
const connectDB = require('./db/connect');


//router
const authRouter = require('./routes/auth');
const studentsRouter = require('./routes/students');  


// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());


// routes
app.use('/auth', authRouter);
app.use('/students', studentsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();