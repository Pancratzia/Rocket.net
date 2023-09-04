import React from 'react';
import "./GestionUsuarios.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import { useState } from 'react';


function GestionUsuarios() {

   const columnas = [
    { field: 'id', headerName: 'ID', width: 40 },
    {
      field: 'usuario',
      headerName: 'Usuario',
      width: 100,
      editable: true,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
      editable: true,
    },
    {
      field: 'apellido',
      headerName: 'Apellido',
      width: 110,
      editable: true,
    },
    {
      field: 'pregunta',
      headerName: 'Pregunta',
      description: 'Esta es la pregunta de seguridad',
      width: 160,
    },
    {
      field: 'extensiontelefonica',
      headerName: 'Extension telefonica',
      width: 160,
    },
    {
      field: 'telefono',
      headerName: 'Telefono',
      width: 120,
      type:'number',
    },
    {
      field: 'cedula',
      headerName: 'Cedula',
      width: 120,
      type: 'number',
    },
    {
      field: 'correo',
      headerName: 'Correo',
      width: 160,
    },
  ];
  
  const filas = []



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
        <div className='titulo-usuarios'>
          <h1>Gestion de usuarios</h1>
          <hr/>
        </div>
        <div className='contenedor-busqueda'>
          <button className='boton-usuarios' onClick={() => cambiarEstadoModal(!estadoModal)}>Agregar</button>

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

    <Tabla columns={columnas} rows={filas} actions={true}/>
      </div>

    </div>

  );

}

export default GestionUsuarios;