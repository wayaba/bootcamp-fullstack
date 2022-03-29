import { useState } from 'react'

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const note = {
      content: newNote,
      important: false,
    }
    console.log({ note })
    addNote(note)
    setNewNote('')
  }

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  return (
    <>
      <h3>Create a new note</h3>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Write your note content"
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form>
    </>
  )
}

export default NoteForm
