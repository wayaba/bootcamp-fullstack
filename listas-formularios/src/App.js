
import { useState } from "react";
import { Note } from "./Note";

const App = (props) => {

  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const note = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      importante: Math.random < 0.5
    }
    console.log({ note })
    setNotes([...notes, note])
    setNewNote("")
  }

  const handleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <h1>Notas</h1>
      <button onClick={handleShowAll}>{showAll ? 'Muestra solo importantes' : 'Muestra Todos'}</button>
      <ul>
        {notes.filter((note) => {
          if (showAll) return true
          return note.important === true
        })
          .map(note => (<Note key={note.id} {...note} />
          ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote}></input>
        <button>Guardar Nota</button>
      </form>
    </div>
  );
}

export default App;
