import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => {
    console.log(1)
    return response.data
  })
}

const create = (newObject) => {
  const config = {
    headers: {
      Authorization: token,
    },
  }

  const request = axios.post(baseUrl, newObject, config)
  return request.then((response) => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then((response) => response.data)
}

const notes = { getAll, create, update, setToken }

export default notes
