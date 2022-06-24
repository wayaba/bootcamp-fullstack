//import { createNote, toggleImportanceOf } from './reducers/noteReducer'
//import { createNote, toggleImportanceOf } from './reducers/todosSlice'
import { created, toggle } from './store/slices/notes'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const notas = useSelector((state) => state.notes)

  const dispatch = useDispatch()

  const addNote = (e) => {
    e.preventDefault()
    const { target } = e
    const content = target.note.value
    console.log('target', content)
    target.note.value = ''
    dispatch(created(content))
  }

  const toggleItem = (id) => {
    console.log('id', id)

    dispatch(toggle(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note"></input>
        <button>Add</button>
      </form>
      <ul>
        {notas.map((note) => {
          return (
            <li key={note.id}>
              {note.content}
              <strong>
                {note.important ? ' importante' : ' NO imporante'}
              </strong>
              <button onClick={() => toggleItem(note.id)}>aaaaaaaaaa</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App
