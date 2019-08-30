const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const userRouter = require('./routes/api/user');
const tripRouter = require('./routes/api/trip')

let mongoUri = ""
switch (process.env.NODE_ENV) {
  case "dev":
    mongoUri = process.env.MONGO_URI_DEV
    break;
  case "prod":
    mongoUri = process.env.MONGO_URI_PROD

  default:
    break;
}

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useCreateIndex: true }
)
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err))

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static('public'))

// middleware parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// middleware serve static files
app.use('/uploads/avatars', express.static('./uploads/avatars'))

// middleware route handler
app.use('/api/users', userRouter)
app.use('/api/trips', tripRouter)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`App is running on ${port}`)
})