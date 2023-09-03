import React, { useState, useRef } from "react";
import "../styles/Panel.css"; // Importa el archivo CSS para los estilos
import Mapa from "../Mapa/Mapa";

function Panel() {


  const [posicionActual, setPosicionActual] = useState(null);
  const divisionIzquierdaRef = useRef(null);

  const manejarBuscarClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosicionActual({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        divisionIzquierdaRef.current.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      alert("Este navegador no soporta geolocalización");
    }
  };
  

  return (
    <div className="panel">
      <div ref={divisionIzquierdaRef} className="division-izquierda">
        <Mapa posicionActual={posicionActual} />
      </div>
      <div className="division-derecha">
        <p className="texto-principal">
          ¡Conoce si estás dentro de las zonas de Cobertura que cubre
          Rocket.net!
          
            <br />
          
          Somos la empresa de telecomunicaciones en la que puedes confiar.
          Garantizamos rapidez, eficiencia y el mejor servicio al cliente. ¡Te
          Esperamos!
        </p>
        <div className="buscador">
          <button className="boton-buscador" onClick={manejarBuscarClick}>Buscar</button>
        </div>
        <p className="texto-secundario">
          **Estas zonas de cobertura pueden sufrir cambios en el tiempo. Seguimos trabajando para conectar a nuestros clientes.
        </p>
        <a href="https://web.whatsapp.com/send?phone=584145272754"><button className="boton-contactanos">Contactanos</button></a>
      </div>
    </div>
  );
}

export default Panel;
