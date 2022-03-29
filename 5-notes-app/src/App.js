import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import Note from './components/Note'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

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
  }

  return (
    <div>
      <NoteForm addNote={addNote}></NoteForm>
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
