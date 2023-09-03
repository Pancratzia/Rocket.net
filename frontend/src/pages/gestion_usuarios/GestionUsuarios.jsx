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
      field: 'clave_usuario',
      headerName: 'Clave',
      width: 150,
    },

    {
      field: 'correo_electronico',
      headerName: 'Correo',
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
      field: 'cedula_usuario',
      headerName: 'Cedula',
      width: 150,
    },

    {
      field: 'pregunta_usuario',
      headerName: 'Pregunta de seguridad',
      width: 190,
    },

    {
      field: 'respuesta_usuario',
      headerName: 'Respuesta de seguridad',
      width: 190,
    },

    {
      field: 'extension_usuario',
      headerName: 'Extension telefonica',
      width: 180,
    },

    {
      field: 'telefono_usuario',
      headerName: ' Número telefonico',
      width: 180,
    },
    {
      field: 'accion_usuario',
      headerName: 'Accion',
      width: 100,
    }
  ]




  const [estadoModal, cambiarEstadoModal] = useState(false);

  const opcionesTipoUsuario = [
    { value: 'admin', label: 'Administrador' },
    { value: 'user', label: 'Usuario' },
    { value: 'guest', label: 'Invitado' },
  ];

  const opcionesSedeDepartamento = [
    { value: 'departamento1', label: 'Departamento1' },
    { value: 'departamento2', label: 'Departamento2' },
    { value: 'departamento2', label: 'Departamento3' },
  ];

  const opcionesPreguntasSeguridad = [
    { value: 'pregunta1', label: 'Pregunta 1' },
    { value: 'pregunta2', label: 'Pregunta 2' },
    { value: 'pregunta3', label: 'Pregunta 3' },
  ];



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
          campos={columnas.map(({ headerName: campo, field: idCampo, typeCampo }) => {
          if (idCampo === 'tipo_usuario') {
            return {
              campo,
              idCampo,
              typeCampo: 'select',
              options: opcionesTipoUsuario,
            };
          } 

          if (idCampo === 'sede_departamento') {
            return {
              campo,
              idCampo,
              typeCampo: 'select',
              options: opcionesSedeDepartamento,
            };
          } 

          if (idCampo === 'pregunta_usuario') {
            return {
              campo,
              idCampo,
              typeCampo: 'select',
              options: opcionesPreguntasSeguridad,
            };
          } 
          
          else {
            return { campo, idCampo, typeCampo };
          }
        })}
      />




      </div>
    </div>

  );

}

export default GestionUsuarios;