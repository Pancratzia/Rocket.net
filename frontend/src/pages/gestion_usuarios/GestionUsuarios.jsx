import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./GestionUsuarios.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import Swal from "sweetalert2";


function GestionUsuarios() {

  const [usuarios, setUsuarios] = useState([]);

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

  useEffect(() => {
    axios.get('http://localhost:3000/api/usuario')
      .then(response => {
        const usuariosConId = response.data.map(usuario => ({
          id: usuario.id_usuario,
          usuario: usuario.nombre_usuario,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          pregunta: usuario.pregunta,
          extensiontelefonica: usuario.extension_telefonica,
          telefono: usuario.telefono,
          cedula: usuario.cedula,
          correo: usuario.correo,
        }));
        setUsuarios(usuariosConId);
        setFilas(usuariosConId);
      })
      .catch(error => {
        console.error('Error al obtener usuarios:', error);
      });
  }, []);

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
    axios.post('http://localhost:3000/api/usuario', nuevaFila)
    .then(response => {
      if (response.status === 201) {
        setFilas([...filas, nuevaFila]);
        cambiarEstadoModal1(false);
        Swal.fire('Usuario creado', 'El usuario se ha creado correctamente', 'success');
      } else {
        Swal.fire('Error', 'No se pudo crear el usuario', 'error');
      }
    }) 
    .catch(error => {
      // Maneja errores de la solicitud si es necesario
      console.error('Error al crear el usuario:', error);
      Swal.fire('Error', 'Ocurrió un error al crear el usuario', 'error');
    });
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