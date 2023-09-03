import React from 'react';
import "./GestionUsuarios.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import { useState } from 'react';

function GestionUsuarios() {

  const columnas = [
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




  const [estadoModal, cambiarEstadoModal] = useState(false);



 

  return (

    <div>

      



      <div className='contenedor-gestion'>
        <div className='titulo'>
          <h1>Gestion de usuarios</h1>
        </div>
        <div className='contenedor-busqueda'>
          <button className='boton' onClick={() => cambiarEstadoModal(!estadoModal)}>Agregar</button>
  
        </div>

        <Add 
        estado={estadoModal} 
        cambiarEstado={cambiarEstadoModal}
        titulo="Agregar Usuario"

        campo1="Nombre:"
        idCampo1="nombre"
        typeCampo1="text"

        campo2="Apellido:"
        idCampo2="apellido"
        typeCampo2="text"

        campo3="Extensión telefonica:"
        idCampo3="extension"
        typeCampo3="number"

        campo4="Número telefonico:"
        idCampo4="telefono"
        typeCampo4="number"

        campo5="Cedula:"
        idCampo5="nombre"
        typeCampo5="number"

        campo6="Correo:"
        idCampo6="correo"
        typeCampo6="email"

        campo7="Clave:"
        idCampo7="clave"
        typeCampo7="varchar"

        campo8="Tipo de Usuario:"
        idCampo8="tipo"
        typeCampo8=""

        campo9="Departamento:"
        idCampo9="departamento"
        typeCampo9=""

        campo10="Usuario:"
        idCampo10="usuario"
        typeCampo10=""

        campo11="Pregunta:"
        idCampo11="pregunta"
        typeCampo11=""

        campo12="Respuesta:"
        idCampo12="respuesta"
        typeCampo12="text"
        
    />


      </div>
    </div>

  );

}

export default GestionUsuarios;