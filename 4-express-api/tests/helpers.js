const supertest = require('supertest')
const { app } = require('../app')
const api = supertest(app)
const User = require('../models/User')

const initialNotes = [
  {
    content: 'primer nota de futbol',
    important: false,
    date: new Date(),
  },
  {
    content: 'segunda nota de basquet',
    important: true,
    date: new Date(),
  },
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')
  return {
    contents: response.body.map((note) => note.content),
    response,
  }
}

const getUsers = async () => {
  const usersDB = await User.find({})
  return usersDB.map((users) => users.toJSON())
}

module.exports = {
  initialNotes,
  api,
  getAllContentFromNotes,
  getUsers,
}
