const express = require('express')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const homeRouter = require('./controllers/home')
const requestLogger = require('./middleware/requestLogger')
const notFound = require('./middleware/notFound')
const handlerErrors = require('./middleware/handlerErrors')

require('./mongo')

app.use(cors())
app.use(express.json())
app.use(requestLogger)

//localhost:3001/static/bob.png
app.use('/static', express.static('images'))

app.use('/', homeRouter)
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)

app.use(notFound)
app.use(handlerErrors)

module.exports = { app }
