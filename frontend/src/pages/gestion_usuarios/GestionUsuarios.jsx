import React from 'react';
import "./GestionUsuarios.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import Swal from "sweetalert2";
import { useState } from 'react';



function GestionUsuarios() {


  const columnas = [
    { field: 'id', headerName: 'ID', width: 40, editable: false },

    {
      field: 'usuario',
      headerName: 'Usuario',
      width: 100,
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 150,
    },
    {
      field: 'apellido',
      headerName: 'Apellido',
      width: 110,
    },
    {
      field: 'sedepartamento',
      headerName: 'Sede - Departamento',
      description: 'Esta es la pregunta de seguridad',
      width: 160,
      type: 'select',
      options: ['RRHH - Barquisimeto', "2", "3"],
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
      type: 'number',
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
    {
      field: 'password',
      headerName: 'Contrasena',
      width: 140,
    },
    {
      field: 'pregunta',
      headerName: 'Pregunta',
      width: 130,
    },
    {
      field: 'answer',
      headerName: 'Respuesta',
      width: 160,
    },
  ];

  const [filas, setFilas] = useState([]) //esto es del modal agregar
  const [estadoModal1, cambiarEstadoModal1] = useState(false); //esto es del modal de agregar
  const [setCampos] = useState(false);

  const [showModal, setShowModal] = useState(false);  //Aca manejamos los estados del modal editar

  //handleEditClick nos permite mostrar el modal de la fila seleccionada para el editar
  const handleEditClick = (row) => {
    // Mostrar el componente Add
    setShowModal(true); //hace visible el modal 

 
  };

  const handleDeleteRow = (id) => {
    console.log("borrandofila" + id + "en gestion de usuarios");
    const nuevasFilas = filas.filter((fila) => fila.id !== id);
    setFilas(NuevasFilas);
  }


const [camposEditados, setCamposEditados] = useState({});  // aca estaba definiendo para la actualizacion de la fila de la tabla 
 
//esto es para el agregado de las filas con el modal
  const agregarFila = (nuevaFila) => {
    setFilas([...filas, nuevaFila]);
  };


  return (

    <div>

      <div className='contenedor-gestion'>
        <div className='titulo-usuarios'>
          <h1>Gestion de usuarios</h1>
          <hr />
        </div>
        <div className='contenedor-busqueda'> 
          <button className='boton-usuarios' onClick={() => cambiarEstadoModal1(!estadoModal1)}>Agregar</button>
          
        </div>
        <Add
            estado={showModal}
            cambiarEstado={setShowModal}
            titulo="Editar Usuario" //este es el modelo del  componente modal para el editado difiere en algunos detalles con el
            campos={columnas.map(({ headerName: campo, field: idCampo, typeCampo }) => { //El problema esta aqui 
            return { campo, idCampo, typeCampo };
              })}
            camposEditados={camposEditados}
            onSave={(camposEditadosLocal) => {
           
           setShowModal(false);        
           onChange={handleChange};
          }}
          />
        
        
 
       
        <Add
          estado={estadoModal1}
          cambiarEstado={cambiarEstadoModal1}
          titulo="Agregar usuario"
          campos={columnas.map(({ headerName: campo, field: idCampo, type, options }) => {
            if (type === 'select') {
              return {
                campo,
                idCampo,
                typeCampo: 'select',
                options: options,
              };
            }

            else {
              return { campo, idCampo, typeCampo: 'text' };
            }
          })}
          
          filas={filas}
          setFilas={setFilas}
          onGuardar={agregarFila}

        />

<Tabla
  columns={columnas}
  rows={filas}
  actions  
  handleEditClick={handleEditClick}
  handleDeleteRow = {handleDeleteRow}
/>
        
        {/*   */}
      </div>

    </div>

  );

}

export default GestionUsuarios;