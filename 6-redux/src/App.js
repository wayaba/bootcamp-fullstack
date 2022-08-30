import NewNote from './components/NewNote'
import Notes from './components/Notes'
import Pokedex from './components/Pokedex'

import './styles/pokedex.css'

const App = () => {
  return (
    <div className="row">
      <div className="column-left">
        <NewNote />
        <Notes />
      </div>
      <div className="column-right">
        <Pokedex />
      </div>
    </div>
  )
}

export default App
