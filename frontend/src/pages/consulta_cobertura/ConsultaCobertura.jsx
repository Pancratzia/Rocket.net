import React from 'react';
import "./ConsultaCobertura.css";
  

function ConsultaCobertura() {
    return(
        <div className='contenedor-cobertura-principal'>
        <div className="contenedor-cobertura">
        <iframe src='https://rocketnet.netlify.app/' height= "100%" width= "100%" frameborder="0" scrolling="no" id="iframe"></iframe>
        </div>
        </div>
    )
}

export default ConsultaCobertura;