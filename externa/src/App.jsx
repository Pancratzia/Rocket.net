
import './App.css'
import Barra_Superior from './components/Barra_Superior/Barra_Superior.jsx'
import Barra_Titulo from './components/Barra_Titulo/Barra_Titulo';
import Panel from './components/Panel/Panel';


function App() {

  return (
    <div className="App">
      <Barra_Superior />
     <Barra_Titulo />
     <Panel />
    </div>
  )
}

export default App;
