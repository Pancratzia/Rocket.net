
import './App.css'
import Barra_Superior from './components/Barra_Superior/Barra_Superior.jsx'
import Barra_Titulo from './components/Barra_Titulo/Barra_Titulo';
import Footer from './components/Footer/Footer';
import Panel from './components/Panel/Panel';


function App() {

  return (
    <>


      <header className="logo">
        <Barra_Superior />
      </header>

      <section className='banner'>
      <Barra_Titulo />
      </section>

      <main>
    <Panel />
      </main>

      <footer className='footer'>
 <Footer />
        </footer>
   
</>
  )
}

export default App;
