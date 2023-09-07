import React from 'react';
import "./GestionSedes.css";
import Tabla from '../../components/Tabla/Tabla';

function GestionSedes() {

    const columnas =[]
    const filas = []

    return(
        <div className="contenedor-gestion">
        <div className="titulo-sedes">
            <h1>Gestion de Sedes</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
            <button className='boton-sedes'>Agregar</button>
        </div>
        <Tabla columns={columnas} rows={filas}/>
        </div>
    )
}

export default GestionSedes;