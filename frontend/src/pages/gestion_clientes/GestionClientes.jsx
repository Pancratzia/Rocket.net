import React from 'react';
import "./GestionClientes.css";
import Tabla from '../../components/Tabla/Tabla';

function GestionClientes() {

    const columnas =[]
    const filas = []

    return(
        <div className="contenedor-gestion">
        <div className="titulo-clientes">
            <h1>Gestion de Clientes</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
            <button className='boton-clientes'>Agregar</button>
        </div>
        <Tabla columns={columnas} rows={filas}/>
        </div>
    )
}

export default GestionClientes;