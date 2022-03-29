
import { useEffect, useState } from "react";
import { Note } from "./Note";
import { create, getAll } from "./services/notes"

const App = () => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      //ejemplo de server local
      //axios.get('http://localhost:3001/notes ')

      getAll().then((data) => {
        setNotes(data)
        setLoading(false)
      })

      /*
      ejemplo con fetch
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(json => {
          setNotes(json)
          setLoading(false)
        })
        */
    }, 2000)

  }, [])


  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const note = {
      title: newNote,
      body: newNote,
      userId: 1
    }
    setError("")
    create(note)
    .then( data => {
      setNotes([...notes, data])      
      //es lo mismo que lo de arriba
      //setNotes((prevNotes)=> prevNotes.concat(data))
    })
    .catch(e=> setError("Error pegandole a la API"))
   
    setNewNote("")
  }


  return (
    <div>
      <h1>Notas</h1>
      <p>{loading ? 'Cargando...' : ''}</p>
      <ol>
        {notes.map(note => (<Note key={note.id} {...note} />))}
      </ol>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} value={newNote}></input>
        <button>Guardar Nota</button>        
      </form>
      {error ? <span style={{color:"red"}}>{error}</span>:""}
    </div>
  );
}

export default App;
