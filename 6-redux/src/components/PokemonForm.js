import { useState } from 'react'

const PokemonForm = ({ setPokemonId, setLoading, setError }) => {
  const [pokemon, setPokemon] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (pokemon !== '') {
      // Estara cargando por que hará una petición a la API
      setError(true)
      setLoading(true)
      const pokemonID = window.isNaN(parseInt(pokemon))
        ? pokemon.toLowerCase()
        : pokemon
      setPokemonId(pokemonID)
      setPokemon('')
      return
    }
    setError(true) //Si manda el formulario vacío, hay un error
  }

  return (
    <form className="pokemon-form" onSubmit={handleSubmit}>
      <input
        className="pokemon-input"
        type="text"
        name="pokemon"
        value={pokemon}
        placeholder="Busca tu pokemon"
        //Actualizas el valor del input cuando el usuario teclea
        onChange={(e) => setPokemon(e.target.value)}
        autoComplete="off"
      />
      <input type="submit" className="pokemon-btn" value="" />
    </form>
  )
}

export default PokemonForm
