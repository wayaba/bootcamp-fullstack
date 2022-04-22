import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    noteService.setToken(user.token)
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const handleShowAll = () => {
    setShowAll(!showAll)
  }

  const toggleImportanceOf = (id) => {
    // console.log('importance of ' + id + ' needs to be toggled')
    console.log(`importance of ${id} needs to be toggled`)
    const note = notes.find((note) => note.id === id)
    const changedNote = { ...note, important: !note.important }

    console.log({ changedNote })
    noteService
      .update(id, changedNote)
      .then((returnedNote) =>
        setNotes(notes.map((n) => (n.id === id ? returnedNote : n)))
      )
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    console.log('submitt')
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log(user)

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button>Login</button>
      </form>

      <Notification message={errorMessage} />
      <NoteForm addNote={addNote}></NoteForm>
      <div>
        <button onClick={handleLogout}>Cerrar Sesion</button>
      </div>
      <h1>Notas</h1>
      <button onClick={handleShowAll}>
        {showAll ? 'Muestra solo importantes' : 'Muestra Todos'}
      </button>
      <ul>
        {notes
          .filter((note) => {
            if (showAll) return true
            return note.important === true
          })
          .map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
      </ul>
    </div>
  )
}

export default App
