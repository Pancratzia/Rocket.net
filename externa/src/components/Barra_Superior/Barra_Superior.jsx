import React from 'react';
import '../styles/Barra_Superior.css'; // Importa el archivo CSS para los estilos
import logo from '../Images/logo2.png';


function Barra_Superior() {
  return (
    <div className="barra-superior">


      <div className='logo-contenedor'>
        <img className='logo' src={logo} alt="" />
      </div>
    </div>


  );
}

export default Barra_Superior;
