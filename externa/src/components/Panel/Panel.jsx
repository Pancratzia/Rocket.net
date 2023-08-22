import React from 'react';
import '../styles/Panel.css'; // Importa el archivo CSS para los estilos
import mapa from '../Images/mapa.jpg';
import { AiOutlineSearch } from 'react-icons/ai';
import Mapview from '../Mapa/Mapview';

function Panel() {
  return (
    <div className="panel">
      <div className="division-izquierda">
        <Mapview/>
      </div>
      <div className="division-derecha">
        <p className='texto-principal'>¡Conoce si estás dentro de las zonas de Cobertura que cubre Rocket.net!
          <div>
            <br />

          </div>

          Somos la empresa de telecomunicaciones en la que puedes confiar. Garantizamos rapidez, eficiencia y el mejor servicio al cliente. ¡Te Esperamos!
        </p>
        <div className='buscador'>
          <button className='boton-buscador'>Buscar</button>
        </div>
        <p className='texto-secundario'>**Estas areas de cobertura pueden sufrir cambios para el incremento del alcance de las coberturas</p>
        <button className='boton-contactanos'>Contactanos</button>
      </div>
    </div>
  );
}

export default Panel;
