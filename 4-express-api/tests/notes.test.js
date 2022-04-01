const mongoose = require('mongoose')
const { server } = require('../index')
const Note = require('../models/Note')
const { initialNotes, api, getAllContentFromNotes } = require('./helpers')

beforeEach(async () => {
  await Note.deleteMany({})

  //paralelo
  // const notesObjects = initialNotes.map(note => new Note(note))
  // const promises = notesObjects.map(note => note.save())
  // await Promise.all(promises)

  //secuencial
  for (let note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

describe('GET all', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are 2 notes', async () => {
    const { response } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('there first note is about futbol', async () => {
    const { contents } = await getAllContentFromNotes()

    expect(contents).toContain('primer nota de futbol')
  })
})

describe('PUTs', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'nota insertada',
      important: true,
    }
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { contents, response } = await getAllContentFromNotes()

    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain(newNote.content)
  })

  test('a note without content can not be added', async () => {
    const newNote = {
      important: true,
    }
    await api.post('/api/notes').send(newNote).expect(400)

    const { response } = await getAllContentFromNotes()

    expect(response.body).toHaveLength(initialNotes.length)
  })
})

describe('DELETEs', () => {
  test('a note can be deleted', async () => {
    const { response: firstResponse } = await getAllContentFromNotes()

    const { body: notes } = firstResponse
    const noteToDelete = notes[0]

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

    const { response: secondResponse, contents } =
      await getAllContentFromNotes()
    expect(secondResponse.body).toHaveLength(initialNotes.length - 1)
    expect(contents).not.toContain(noteToDelete.content)
  })

  test('a note can not be deleted if id does not exists', async () => {
    await api.delete(`/api/notes/1234`).expect(400)

    const { response, contents } = await getAllContentFromNotes()
    expect(response.body).toHaveLength(initialNotes.length)
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
