const notesRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Note = require('../models/note')
const User = require('../models/user')

notesRouter.get('/', (request, response) => {
  Note.find({})
    .populate('user', { username: 1, name: 1 })
    .then((notes) => response.json(notes))
})

notesRouter.get('/:id', (request, response, next) => {
  const { id } = request.params

  Note.findById(id)
    .then((note) => {
      note ? response.json(note) : response.status(404).end()
    })
    .catch((e) => next(e))
})

notesRouter.delete('/:id', userExtractor, (request, response, next) => {
  const { id } = request.params
  Note.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch((error) => next(error))
})

notesRouter.post('/', userExtractor, async (request, response, next) => {
  const { content, important = false } = request.body

  if (!content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const { userId } = request
  const user = await User.findById(userId)

  const newNote = new Note({
    content: content,
    important: important,
    date: new Date().toISOString(),
    user: user._id,
  })

  try {
    const savedNote = await newNote.save()
    user.notes = [...user.notes, savedNote._id]
    await user.save()

    response.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }
})

notesRouter.put('/:id', userExtractor, (request, response) => {
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
