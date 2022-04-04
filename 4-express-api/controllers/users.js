const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', (request, response) => {
  const { username, name, password } = request.body

  User.findOne({ username }).then((existingUser) => {
    if (existingUser) {
      response.status(400).json({
        error: 'username must be unique',
      })
    }
  })

  const newUser = new User({
    username,
    name,
    passwordHash: bcrypt.hashSync(password, 10),
  })

  newUser
    .save()
    .then((savedUser) => response.status(201).json(savedUser))
    .catch((e) => console.log(e))
})

module.exports = usersRouter
