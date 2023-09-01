import React from 'react';
import "./GestionUsuarios.css";
import Tabla  from '../../components/Tabla/Tabla';

function GestionUsuarios(){

    const columnas  = [
        {
        field: 'foto_usuario',
        headerName: 'Foto',
        width: 80,
        },
        {
        field: 'usuario', //campo
        headerName: 'Usuario',  //nombre de la columna
        width: 90, // el ancho que ocupa
        },

        {
        field: 'sede_departamento',
        headerName: 'Departamento',
        width: 150,    
        },

        {
        field: 'tipo_usuario',
        headerName: 'Tipo',
        width: 80,
        },

        {
        field: 'nombre_usuario',
        headerName: 'Nombre',
        width: 150,
        },

        {
        field: 'apellido_usuario',
        headerName: 'Apellido',
        width: 150,
         },
        
        {
        field: 'pregunta_usuario',
        headerName: 'Pregunta de seguridad',
        width: 190,
        },

        {
        field: 'extension_usuario',
        headerName: 'Extension telefonica',
        width: 180,
        },
        {
        field: 'accion_usuario',
        headerName: 'Accion',
        width: 100,
        }
    ]

    const filas = [

    ]
        //div contenedor del componente tabla donde se le pasan las tres props (titulo, columnas y filas 


    return(
    <div className='contenedor-gestion'>
        <div className='titulo'>
        <h1>Gestion de usuarios</h1>
        </div>
        <div className='contenedor-busqueda'>
        <button className='boton'>Agregar</button>   
        </div>

        <div className='contenedor-tabla'> 
             <Tabla columns = {columnas}  rows = {filas}/> 
        </div>
    </div>
    );
}

export default GestionUsuarios;