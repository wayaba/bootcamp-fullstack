const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then((notes) => response.json(notes))
})

notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then((note) => {
      note ? response.json(note) : response.status(404).end()
    })
    .catch((e) => next(e))
})

notesRouter.delete('/:id', (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

notesRouter.post('/', (request, response) => {
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

notesRouter.put('/:id', (request, response) => {
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

module.exports = notesRouter
