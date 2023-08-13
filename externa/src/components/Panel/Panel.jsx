import React from 'react';
import '../styles/Panel.css'; // Importa el archivo CSS para los estilos
import mapa from '../Images/mapa.jpg';

function Panel() {
  return (
    <div className="panel">
      <div className="division-izquierda">
        <img className='mapa' src={mapa} alt="Imagen" />
      </div>
      <div className="division-derecha">
        <p className='texto-principal'>Conoce si estás dentro de las zonas de Cobertura que cubre Rocket.net!

          Somos la empresa de telecomunicaciones en la que puedes confiar. Garantizamos rapidez, eficiencia y el mejor servicio al cliente. Te Esperamos!
        </p>
        <div className='buscador'><input className='input-buscador' type="text" placeholder="Escribe aquí" /> 
          <button className='boton-buscador'>Buscar</button>
        </div>
        <p className='texto-secundario'>**Estas areas de cobertura pueden sufrir cambios para el incremento del alcance de las coberturas</p>
        <button className='boton-contactanos'>Contactanos</button>
      </div>
    </div>
  );
}

export default Panel;
