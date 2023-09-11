import React from 'react';
import "./GestionUsuarios.css";
import Tabla from '../../components/Tabla/Tabla';
import Modal from '../../components/Modal/Modal';
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
  const [filaEditar, setFilaEditar] = useState(null);
  const [showModal, setShowModal] = useState(false);  //Aca manejamos los estados del modal editar

  //handleEditClick nos permite mostrar el modal de la fila seleccionada para el editar
  const handleEditRow = (id) => {
    console.log("selecciono la fila con" + id + "en gestion de usuarios");
    setCamposEditados(filas.id);
    setShowModal(true);
  };

  const handleDeleteRow = (id) => {
    console.log("borrandofila" + id + "en gestion de usuarios");
    const nuevasFilas = filas.filter((fila) => fila.id !== id);
    setFilas(nuevasFilas);
  }


const [camposEditados, setCamposEditados] = useState({});  // aca estaba definiendo para la actualizacion de la fila de la tabla 
 
  const handleChange = (event) => {
    const {id, value} = event.target;
    setCamposEditados({...camposEditados, [id]: value})
  }

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
        <Modal
            estado={showModal}
            cambiarEstado={setShowModal}
            titulo="Editar Usuario" //este es el modelo del  componente modal para el editado difiere en algunos detalles con el
            filaExistente={handleEditRow}
            campos={columnas.map(({ headerName: campo, field: idCampo, typeCampo }) => { //El problema esta aqui 
            return { campo, idCampo, typeCampo};
              })}
            camposEditados = {camposEditados}
            onSave={(camposEditadosLocal) => {
           
           setShowModal(false);        
           onChange={handleChange};
          }}
          />
        
        
 
       
        <Modal
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
        <div className='contenedor-tabla'>
        <Tabla
          columns={columnas}
          rows={filas}
          actions  
          handleEditRow={handleEditRow}
          handleDeleteRow = {handleDeleteRow}
        />
        </div>
      </div>

    </div>

  );

}

export default GestionUsuarios;