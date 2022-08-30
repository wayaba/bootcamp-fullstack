import { created } from '../store/notes/noteSlice'
import { useDispatch } from 'react-redux'

const NewNote = () => {
  const dispatch = useDispatch()

  const addNote = (e) => {
    e.preventDefault()
    const { target } = e
    const content = target.note.value
    console.log('target', content)
    target.note.value = ''
    dispatch(created(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note"></input>
      <button>Add</button>
    </form>
  )
}

export default NewNote
