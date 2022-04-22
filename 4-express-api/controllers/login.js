const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    response.status(401).json({ error: 'Invalid User or Password' })
  }

  const jwtPayload = {
    id: user._id,
    username: user.username,
  }

  const token = jwt.sign(jwtPayload, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  response.send({
    name: user.name,
    username: user.username,
    token,
  })
})

module.exports = loginRouter
