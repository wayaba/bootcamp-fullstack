import axios from 'axios'
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'

const getById = (id) => {
  return axios
    .get(baseUrl + id)
    .then((res) => res.data)
    .catch((e) => console.log(e))
}

const pokeapi = { getById }
export default pokeapi
