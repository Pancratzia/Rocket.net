import React from 'react';
import "./Reportes.css";
import Tabla from '../../components/Tabla/Tabla';

function Reportes() {

    const columnas =[]
    const filas = []

    return(
        <div className="contenedor-gestion">
        <div className="titulo-reportes">
            <h1>Reportes</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
        <select className='opcion-reportes' name="Selecciona la opcion">
        <option>Selecciona la opcion</option>
        </select>
        </div>
        <Tabla columns={columnas} rows={filas}/>
        </div>
    )
}

export default Reportes;