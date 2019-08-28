const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

const userRouter = require('./routes/api/user');
const tripRouter = require('./routes/api/trip')

const mongoUri = process.env.NODE_ENV === "dev" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PROD

console.log("TCL: mongoUri", mongoUri)
console.log("TCL: process.env.NODE_ENV",
  process.env.NODE_ENV)

mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useCreateIndex: true }
)
  .then(() => console.log("Connected successfully"))
  .catch((err) => console.log(err))

const app = express();

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