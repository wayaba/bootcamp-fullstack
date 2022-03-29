const express = require('express')
const cors = require('cors')
const app = express()
const logger = require('./loggerMiddelwere')

app.use(cors())
app.use(express.json())

app.use(logger)

// const http = require('http')

//   const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(notes))
//   })

let notes = [
  {
    id: 1,
    content: 'HTML is easy!!',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body || !body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const newNote = {
    id: generateId(),
    content: body.content,
    important: typeof body.important !== undefined ? body.important : false,
    date: new Date().toISOString(),
  }

  notes = [...notes, newNote]
  console.log(body)

  response.status(201).json(newNote)
})

app.put('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = request.body
  notes = notes.map((n) => (n.id === id ? note : n))

  response.status(200).json(note)
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

app.use((request, response) => {
  response.status(404).json({
    error: 'Not found',
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
