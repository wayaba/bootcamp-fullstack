const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

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

notesRouter.post('/', async (request, response, next) => {
  const { content, important = false, userId } = request.body

  if (!content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const user = await User.findById(userId)

  const newNote = new Note({
    content: content,
    important: important,
    date: new Date().toISOString(),
    user: userId,
  })

  try {
    const savedNote = await newNote.save()
    user.notes = [...user.notes, savedNote._id]
    await User.findOneAndUpdate({ id: user._id }, user, {
      runValidators: false,
    })

    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
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
