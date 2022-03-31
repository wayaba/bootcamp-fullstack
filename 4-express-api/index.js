const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./middleware/logger')
const notFound = require('./middleware/notFound')
const handlerErrors = require('./middleware/handlerErrors')

require('dotenv').config()
require('./mongo')

const Note = require('./models/Note')

app.use(cors())
app.use(express.json())
app.use(logger)
//localhost:3001/static/bob.png
app.use('/static', express.static('images'))

let notes = []

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then((notes) => response.json(notes))
})

app.get('/api/notes/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then((note) => {
      note ? response.json(note) : response.status(404).end()
    })
    .catch((e) => next(e))
})

app.delete('/api/notes/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const newNote = new Note({
    content: note.content,
    important: note.important || false,
    date: new Date().toISOString(),
  })

  newNote
    .save()
    .then((savedNote) => response.status(201).json(savedNote))
    .catch((e) => console.log(e))

  console.log(newNote)
})

app.put('/api/notes/:id', (request, response) => {
  const { id } = request.params

  const note = request.body
  const noteNewInfo = {
    content: note.content,
    important: note.important,
  }

  Note.findOneAndUpdate(id, noteNewInfo, { new: true }).then((result) =>
    response.status(200).json(result)
  )
})

app.use(handlerErrors)
app.use(notFound)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
