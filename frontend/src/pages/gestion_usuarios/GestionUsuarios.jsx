import React from 'react';
import "./GestionUsuarios.css";
import Tabla  from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import { useState } from 'react';

function GestionUsuarios(){


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
  
  const filas = [
    { id: 1, usuario: 'admin', nombre: 'Pedro', apellido: 'Tovar', pregunta: 'Animal favorito', extensiontelefonica: '22911191', telefono: '04121234567', cedula: 'V2012940', correo: 'pedro@rocket.net' },
  ];

  return (
    <div className='contenedor-gestion'>
      <div className='titulo'>
        <h1>Gestion de usuarios</h1>
        <hr/>
      </div>
      <div className='contenedor-busqueda'>
        <button className='boton' onClick={handleOpenAddModal}>Agregar</button>
      {/*<button className='boton boton-editar' onClick={handleOpenAddModal}>Editar</button>*/}  
      </div>
      {showAddModal && <Add onSave={handleSave} onCancel={handleCancel} />}
      <Tabla columns={columnas} rows={filas} actions={true}/>
    </div>
  );
}

export default GestionUsuarios;