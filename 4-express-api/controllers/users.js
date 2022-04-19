const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

// EJEMPLO CON PROMESA
// usersRouter.get('/', (request, response) => {
//   User.find({}).then((users) => response.json(users))
// })

// EJEMPLO CON ASYNC-AWAIT
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, name, password } = body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.put('/:id', (request, response) => {
  const { id } = request.params

  const user = request.body
  const userNewInfo = {
    name: user.name,
  }

  User.findOneAndUpdate(id, userNewInfo, { new: true }).then((result) =>
    //agergo {new:true} para que me devuelva el registro actualizado
    response.status(200).json(result)
  )
})

module.exports = usersRouter
