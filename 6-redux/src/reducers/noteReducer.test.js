import { noteReducer } from './noteReducer'

describe('noteReducer', () => {
  test('returns new state after action with toggle importance', () => {
    const state = [
      {
        id: 1,
        content: 'hola carola',
        important: false,
      },
      {
        id: 2,
        content: 'chau raul',
        important: true,
      },
    ]

    const action = {
      type: '@notes/toggle_important',
      payload: {
        id: 1,
      },
    }

    const newState = noteReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toContainEqual(state[1])
    expect(newState).toContainEqual({
      id: 1,
      content: 'hola carola',
      important: true,
    })
  })
})
