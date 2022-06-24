import { createSlice } from '@reduxjs/toolkit'
import nextId from 'react-id-generator'

export const noteSlice = createSlice({
  name: 'notes',
  initialState: [
    {
      id: 1,
      content: 'sarasa',
      important: true,
    },
    {
      id: 2,
      content: 'sarasa 2',
      important: false,
    },
  ],
  reducers: {
    created: (state, action) => {
      return [
        ...state,
        {
          id: nextId(),
          content: action.payload,
          important: false,
        },
      ]
    },
    toggle: (state, action) => {
      const id = action.payload

      return state.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            important: !note.important,
          }
        }
        return note
      })
    },
  },
})

export default noteSlice.reducer
export const { created, toggle } = noteSlice.actions
