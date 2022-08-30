import { toggle } from '../store/notes/noteSlice'
import { useDispatch, useSelector } from 'react-redux'

const Notes = () => {
  const notas = useSelector((state) => state.notes)

  const dispatch = useDispatch()

  const toggleItem = (id) => {
    console.log('id', id)

    dispatch(toggle(id))
  }

  return (
    <ul>
      {notas.map((note) => {
        return (
          <li key={note.id}>
            {note.content}
            <strong>{note.important ? ' importante' : ' NO imporante'}</strong>
            <button onClick={() => toggleItem(note.id)}>aaaaaaaaaa</button>
          </li>
        )
      })}
    </ul>
  )
}

export default Notes
