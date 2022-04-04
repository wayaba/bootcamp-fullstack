const supertest = require('supertest')
const { app } = require('../app')
const api = supertest(app)
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
module.exports = {
  initialNotes,
  api,
  getAllContentFromNotes,
}
