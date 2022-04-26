import Togglable from './Togglable'
import { useState } from 'react'

const LoginForm = ({ doLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = {
      username: username,
      password: password,
    }
    console.log('en el handler el user: ', user)
    doLogin(user)
    setUsername('')
    setPassword('')
  }
  return (
    <Togglable buttonLabel="Show Login">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          name="Username"
          placeholder="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </Togglable>
  )
}

export default LoginForm
