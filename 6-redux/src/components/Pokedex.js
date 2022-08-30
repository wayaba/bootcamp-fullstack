import PokedexScreen from './PokedexScreen'
import { useState, useEffect } from 'react'
//import pokeapi from '../services/pokeApi'
import PokemonForm from './PokemonForm'

const Pokedex = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState(null)
  const RandomId = Math.floor(Math.random() * 806 + 1)
  // Inicamos con ID random para siempre tener un pokemón
  const [pokemonID, setPokemonId] = useState(RandomId)

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data)
        setLoading(false)
        setError(false)
      })
      .catch((err) => {
        setLoading(false)
        setError(true)
      })
    /*
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = pokeapi.getById(Math.floor(Math.random() * 806 + 1))
      // set state with the result
      console.log('aaaaaaadata', data)
      setPokemon(data)
      setIsOnline(true)
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error)
*/
    //setIsOnline(true)
    //console.log(pokemon)
  }, [pokemonID])

  //return <Pokedex pokemon={pokemon}></Pokedex>

  return (
    <div className="pokedex">
      <div className="pokedex-left">
        <div className="pokedex-left-top">
          <div className="light is-sky is-big" />
          <div className="light is-red" />
          <div className="light is-yellow" />
          <div className="light is-green" />
        </div>
        <div className="pokedex-screen-container">
          <PokedexScreen pokemon={pokemon} loading={loading} error={error} />
        </div>
        <div className="pokedex-left-bottom">
          <div className="pokedex-left-bottom-lights">
            <div
              className="pokemon-btn"
              onClick={() => setPokemonId(Math.floor(Math.random() * 806 + 1))}
            />
            <div className="light is-green is-large" />
            <div className="light is-orange is-large" />
          </div>
          <PokemonForm
            setPokemonId={setPokemonId}
            setLoading={setLoading}
            setError={setError}
          />
        </div>
      </div>
      <div className="pokedex-right-front" />
      <div className="pokedex-right-back" />
    </div>
  )

  //return <div>hola</div>
}

export default Pokedex
