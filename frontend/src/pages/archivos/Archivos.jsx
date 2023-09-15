import React from 'react';
import { useState } from 'react';
import ModalArchivo from '../../components/ModalArchivo/ModalArchivo';
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
        {
            field: "idusuario",
            headerName: "Usuario",
            width: 250,
            editable: true,
        },
        {
            field: "fechasubida",
            headerName: "Fecha de subida",
            width: 250,
            editable: true,
        },
        {
            field: "horasubida",
            headerName: "Hora de subida",
            width: 250,
            editable: true,
        },
    ]

    const [filas, setFilas] = useState([])
    const [estadoModal1, cambiarEstadoModal1] = useState(false); //estado para el modal de agregar
    const [showModal, setShowModal] = useState(false);


    return(
        <div className="contenedor-gestion">
        <div className="titulo-archivos">
            <h1>Archivos</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
            <button className='boton-archivos' onClick={() => cambiarEstadoModal1(!estadoModal1)}>Agregar</button>
        </div>
        <ModalArchivo 
        estado={estadoModal1} 
        cambiarEstado={cambiarEstadoModal1}
        subir={(nuevoArchivo) => {agregarArchivo(nuevoArchivo);}}
        />
        
        <Tabla columns={columnas} rows={filas}/>
        </div>
    )
}

export default Archivos;