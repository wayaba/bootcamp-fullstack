import { useState, useRef } from 'react'
import Togglable from './Togglable'

const NoteForm = ({ addNote, handleLogout }) => {
  const [newNote, setNewNote] = useState('')
  const toggableRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    const note = {
      content: newNote,
      important: false,
    }

    addNote(note)
    setNewNote('')
    toggableRef.current.toggleVisibility()
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <Togglable buttonLabel="New Note" ref={toggableRef}>
      <h3>Create a new note</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Write your note content"
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Togglable>
  )
}

export default NoteForm
