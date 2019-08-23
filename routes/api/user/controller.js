const { User } = require('../../../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const { validatePostInput } = require('../../../validations/user/validatePostInput')

module.exports.getUsers = (req, res, next) => {
  console.log('get routers')
  User.find()
    .select("-password")
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => res.json(err))
}

module.exports.createUser = async (req, res, next) => {
  const { email, password, DOB, userType, phone } = req.body;
  const { isValid, errors } = await validatePostInput(req.body)

  if (!isValid) return res.status(400).json(errors)

  const newUser = new User({
    email, password, DOB, userType, phone
  })

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.json(err)
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) return res.json(err)
      newUser.password = hash

      newUser.save()
        .then(user => {
          res.status(200).json(user)
        })
        .catch(err => res.json(err))
    })
  })
}

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "id invalid" })

  User.findById(id)
    .then(user => {
      if (!user) return Promise.reject({ status: 404, message: "User not found" })

      res.status(200).json(user)
    })
    .catch(err => {
      res.status(err.status).json({ message: err.message })
    })
}

module.exports.updateUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      if (!user) return Promise.reject({ status: 404, message: "User not found" })

      Object.keys(req.body)
        .forEach(field => {
          user[field] = req.body[field]
        })
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.json(err)
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return res.json(err)
          user.password = hash
          user.save()
            .then(user => {
              res.status(200).json(user)
            })
            .catch(err => res.json(err))
        })
      })
    })
    .catch(err => {
      if (!err.status) return res.json(err)
      res.status(err.status).json(err.message)
    })
}

module.exports.deleteUserById = (req, res, next) => {
  const { id } = req.params;
  User.deleteOne({ _id: id })
    .then(result => res.status(200).json(result))
    .catch(err => res.json(err))
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) return Promise.reject({ status: 404, message: "User not found" })

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (!isMatch) return res.status(400).json({ message: "Wrong password" })

        const payload = {
          id: user._id,
          email: user.email,
          userType: user.userType
        };

        jwt.sign(
          payload,
          "XEDIKE",
          { expiresIn: 3600 },
          (err, token) => {
            if (err) res.json(err)
            res.status(200).json({
              success: true,
              token
            })
          }
        )
      })
    })
    .catch(err => {
      if (!err.status) return res.json(err)
      res.status(err.status).json({ message: err.message })
    })
}

module.exports.uploadAvatar = (req, res, next) => {
  const { id } = req.params; // headers, params, body, file
  console.log(req.params)
  User.findById(id)
    .then(user => {
      if (!user) return Promise.reject({ status: 404, message: "Not found" })

      user.avatar = req.file.path
      return user.save()
    })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      if (!err.status) return res.json(err)
      res.status(200).json({ messgage: err.message })
    })
}