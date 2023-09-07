import React from 'react';
import "./GestionPlanes.css";
import Tabla from '../../components/Tabla/Tabla';

function GestionPlanes() {

    const columnas =[]
    const filas = []

    return(
        <div className="contenedor-gestion">
        <div className="titulo-planes">
            <h1>Gestion de Planes</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
            <button className='boton-planes'>Agregar</button>
        </div>
        <Tabla columns={columnas} rows={filas}/>
        </div>
    )
}

export default GestionPlanes;