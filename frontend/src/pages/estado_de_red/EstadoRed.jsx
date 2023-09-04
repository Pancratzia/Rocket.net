import React from 'react';
import Tabla  from '../../components/Tabla/Tabla';
import "../estado_de_red/EstadoRed.css";

function  EstadoRed(){

    const columnas  = [
        {
        field: 'nombre_sede', //campo
        headerName: 'Sede',  //nombre de la columna
        width: 250, // el ancho que ocupa
        },

        {
        field: 'latitud',
        headerName: 'Latitud',
        width: 250,    
        },

        {
        field: 'longitud',
        headerName: 'Longitud',
        width: 250,
        },

        {
        field: 'ip',
        headerName: 'Direccion IP',
        width: 250,
        },

        {
        field: 'estado_conexion',
        headerName: 'Estado de Conexion',
        width: 250,
         }
    ]

    //Aca se definen las filas o los registro de la tabla
    const filas = [
        { id: 1, nombre_sede: 'Sede 1', latitud: '12345', longitud: '67890' , ip: '192.168.1.1' , estado_conexion: 'Con conexion'},
        { id: 2, nombre_sede: 'Sede 2', latitud: '12345', longitud: '67890' , ip: '192.168.1.2' , estado_conexion: 'Sin conexion'},
        { id: 3, nombre_sede: 'Sede 3', latitud: '12345', longitud: '67890' , ip: '192.168.1.3' , estado_conexion: 'Con conexion'}
    ]

    return(
        //div contenedor del componente tabla donde se le pasan las tres props (titulo, columnas y filas 
        <div className='contenedor'> 
        <div className='titulo'>
            <h1>Estado de Red</h1>
        </div>
             <Tabla columns={columnas} rows={filas}/> 
        </div>
    )
}

export default EstadoRed;