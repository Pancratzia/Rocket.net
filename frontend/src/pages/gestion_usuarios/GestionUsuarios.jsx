import React from 'react';
import "./GestionUsuarios.css";
import Tabla  from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import { useState } from 'react';

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

    const filas = [];

  const [showAddModal, setShowAddModal] = useState(false);

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleSave = () => {
    // Lógica para guardar el usuario
    setShowAddModal(false);
  };

  const handleCancel = () => {
    setShowAddModal(false);
  };

  return (
    <div className='contenedor-gestion'>
      <div className='titulo'>
        <h1>Gestion de usuarios</h1>
      </div>
      <div className='contenedor-busqueda'>
        <button className='boton' onClick={handleOpenAddModal}>Agregar</button>
        <button className='boton boton-editar' onClick={handleOpenAddModal}>Editar</button>
      </div>

      {/* <div className='contenedor-tabla'>
        <Tabla columns={columnas} rows={filas} />
      </div> */}

      {showAddModal && <Add onSave={handleSave} onCancel={handleCancel} />}
    </div>
  );
}

export default GestionUsuarios;