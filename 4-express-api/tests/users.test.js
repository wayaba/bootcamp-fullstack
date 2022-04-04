const bcrypt = require('bcrypt')
const User = require('../models/User')
const { api, getUsers } = require('./helpers')

beforeEach(async () => {
  await User.deleteMany({})

  const newUser = new User({
    username: 'testuser',
    name: 'Test User',
    passwordHash: bcrypt.hashSync('testuser', 10),
  })
  await newUser.save()
})

describe('creating a new user', () => {
  test('Work as expected create a fresh username', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'testuser2',
      name: 'Test User 2',
      password: 'testuser2',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('When there is initially one user in db', () => {
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await getUsers()

    const newUser = {
      username: 'testuser',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await getUsers()

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
