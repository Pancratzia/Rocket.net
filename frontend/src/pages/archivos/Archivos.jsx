import React from 'react';
import "./Archivos.css";
import Tabla from '../../components/Tabla/Tabla';

function Archivos() {

    const columnas =[
        {
            field: "idarchivo",
            headerName: "ID",
            width: 100,
            editable: true,
        },
        {
            field: "tituloarchivo",
            headerName: "Titulo del archivo",
            width: 200,
            editable: true,
        },
        {
            field: "descripcionarchivo",
            headerName: "Descripcion del archivo",
            width: 250,
            editable: true,
        },
    ]
    const filas = []

    return(
        <div className="contenedor-gestion">
        <div className="titulo-archivos">
            <h1>Archivos</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
            <button className='boton-archivos'>Agregar</button>
        </div>
        <Tabla columns={columnas} rows={filas}/>
        </div>
    )
}

export default Archivos;