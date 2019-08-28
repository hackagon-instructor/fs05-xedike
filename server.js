const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/api/user');
const tripRouter = require('./routes/api/trip')

mongoose.connect(
  // 'mongodb://localhost:27017/fs05-xedike',
  'mongodb+srv://admin:admin@cluster0-lhfxs.mongodb.net/xedike?retryWrites=true&w=majority',
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

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`App is running on ${port}`)
})