import { useState } from 'react';
import ReactDOM from 'react-dom';

const INITIAL_SPREADEJEMPLO_STATE = {
  left: 0,
  right: 0,
  mensaje: 'Mensaje del estado'
}

const Counter = ({ number }) => {
  return (<h1>{number}</h1>);
}

const WarningNotUsed = () => {
  return <h1>El contador de clicks aun no se utilizó</h1>
}

//desectructuro los clicks para obtenerlos de props
const ListOfClicks = ({ clicks }) => {
  return <p>{clicks.join(", ")}</p>
}

const App = () => {
  const [contador, setContador] = useState(0)

  const [spreadEjemplo, setSpreadEjemplo] = useState(INITIAL_SPREADEJEMPLO_STATE)

  const [clicks, setClicks] = useState([])

  const handlerClickLeft = (event) => {
    event.preventDefault()

    console.log(event)
    setSpreadEjemplo(
      {
        ...spreadEjemplo,
        left: spreadEjemplo.left + 1
      }
    )

    setClicks((prevClicks) => [...prevClicks, "L"])
  }

  const handlerClickRight = () => {
    setSpreadEjemplo(
      {
        ...spreadEjemplo,
        right: spreadEjemplo.right + 1
      }
    )

    setClicks((prevClicks) => prevClicks.concat("R"))
  }

  const handlerClickResetSpread = () =>{
    setSpreadEjemplo(INITIAL_SPREADEJEMPLO_STATE)
    setClicks([])
  }
  
  const handlerClickIncrement = () => {

    //funcion que permite cambiar el estado
    setContador(prevContador => prevContador + 1)
    //hace lo mismo que la linea de arriba
    //setContador(contador + 1)
  }

  const handlerClickReset = () => {
    setContador(0)
  }

  const isEven = contador % 2 === 0
  const msgIsEven = isEven ? 'es par' : 'es impar'

  return (
    <div>
      <p>El valor del contador es: </p>
      <Counter number={contador} />
      <p>{msgIsEven}</p>
      <button onClick={handlerClickIncrement}> incrementar</button>
      <button onClick={handlerClickReset}> Resetear</button>

      <h1>Ejemplo Spread operator "..."</h1>
      {spreadEjemplo.left}
      <button onClick={handlerClickLeft}> incrementar Izquierda</button>
      <button onClick={handlerClickRight}> incrementar Derecha</button>
      {spreadEjemplo.right}
      <p>La suma total es: {clicks.length}</p>
      <button onClick={handlerClickResetSpread}> Reset</button>
      <p>{spreadEjemplo.mensaje}</p>
      {clicks.length === 0 ? <WarningNotUsed /> : <ListOfClicks clicks={clicks} />}
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));
