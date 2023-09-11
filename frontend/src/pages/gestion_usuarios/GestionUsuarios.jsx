import React from 'react';
import "./GestionUsuarios.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import Swal from "sweetalert2";
import { useState, useEffect } from 'react';
import axios from 'axios';



function GestionUsuarios() {

  const [sedeDepartamentoOptions, setSedeDepartamentoOptions] = useState([]);

  const [usuarios, setUsuarios] = useState([]);

  const obtenerSedepartamentoOptions = () => {
    axios.get('http://localhost:3000/api/sedesdepartamentos')
      .then(response => {
        if (response.status === 200) {
          const opciones = response.data.map(opcion => ({
            value: opcion.id_sede_departamento,
            label: opcion.sede_departamento,
          }));
          console.log('Opciones obtenidas de la API:', opciones);
          setSedeDepartamentoOptions(opciones);
        } else {
          console.error('Error al obtener las opciones de sedepartamento:', response);
        }
      })  
      .catch(error => {
        console.error('Error al obtener las opciones de sedepartamento:', error);
        });
      };
  
  
  useEffect(() => {
    obtenerSedepartamentoOptions();
  }, []);
 
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
      options: sedeDepartamentoOptions,
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
      field: 'pregunta',
      headerName: 'Pregunta',
      width: 130,
    },
    {
      field: 'tipousuario',
      headerName: 'Tipo de usuario',
      description: 'Esta es el tipo de usuario',
      width: 160,
      type: 'select',
      options: [
        {
          value: 1,
          label: 'Jefes de Sedes',
        },
        {
          value: 2,
          label: 'Usuarios Creación de Archivos',
        },
        {
          value: 3,
          label: 'Usuarios solo lectura',
        }
      ]
     },
   
  ];

  const seguridad = [
    {
      field: 'clave',
      headerName: 'Clave',
      width: 140,
    },
    {
      field: 'respuesta',
      headerName: 'Respuesta',
      width: 160,
    },
  ];

  const todasLasColumnas = [...columnas, ...seguridad];

  const [filas, setFilas] = useState([]) //esto es del modal agregar
  const [estadoModal1, cambiarEstadoModal1] = useState(false); //esto es del modal de agregar
  const [setCampos] = useState(false);

  const [showModal, setShowModal] = useState(false);  //Aca manejamos los estados del modal editar

  // Función para obtener los usuarios desde la API
 const obtenerUsuarios = () => {
  axios.get('http://localhost:3000/api/usuarios')
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
        sedepartamento: usuario.id_sededepar,
        tipousuario: usuario.id_tipousuario
      }));
      setUsuarios(usuariosConId);
      setFilas(usuariosConId);
    })
    .catch(error => {
      console.error('Error al obtener usuarios:', error);
    });

};

useEffect(() => {
  obtenerUsuarios();
}, []);


  //handleEditClick nos permite mostrar el modal de la fila seleccionada para el editar
  const handleEditClick = (row) => {
    // Mostrar el componente Add
    setShowModal(true); //hace visible el modal 

 
  };

  const handleDeleteClick = (idUsuario) => {
    // Realiza la solicitud PATCH para eliminar el usuario
    axios.patch(`http://localhost:3000/api/usuarios/${idUsuario}`)
      .then(response => {
        if (response.status === 200) {
          obtenerUsuarios(); 
        } else {
          console.error('Error al eliminar el usuario:', response);
        }
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };
  
  

  const handleDeleteRow = (id) => {
    console.log("borrandofila" + id + "en gestion de usuarios");
    const nuevasFilas = filas.filter((fila) => fila.id !== id);
    setFilas(nuevasFilas);
    handleDeleteClick(id);
  }


const [camposEditados, setCamposEditados] = useState({});  // aca estaba definiendo para la actualizacion de la fila de la tabla 
 
//esto es para el agregado de las filas con el modal
  const agregarFila = (nuevaFila) => {
    setFilas([...filas, nuevaFila]);
  };


  const agregarUsuario = (nuevoUsuario) => {
  const formData = new FormData();
  const nuevaImagen = new File([], 'user.png', { type: 'image/png' });

  formData.append('nombre_usuario', nuevoUsuario.usuario);
  formData.append('nombre', nuevoUsuario.nombre);
  formData.append('apellido', nuevoUsuario.apellido);
  formData.append('pregunta', nuevoUsuario.pregunta);
  formData.append('extension_telefonica', nuevoUsuario.extensiontelefonica);
  formData.append('telefono', nuevoUsuario.telefono);
  formData.append('cedula', nuevoUsuario.cedula);
  formData.append('correo', nuevoUsuario.correo);
  formData.append('id_sededepar', nuevoUsuario.sedepartamento);
  formData.append('clave', nuevoUsuario.clave);
  formData.append('respuesta', nuevoUsuario.respuesta);
  formData.append('id_tipousuario', nuevoUsuario.tipousuario);
  formData.append('fileUsuario', nuevaImagen);

  axios.post('http://localhost:3000/api/usuarios', formData)
    .then(response => {
      console.log('Respuesta de la solicitud:', response);
      if (response.status === 201) {
        const usuarioCreado = response.data;
        setUsuarios([...usuarios, usuarioCreado]); 
        setFilas([...filas, usuarioCreado]); 
        cambiarEstadoModal1(false); 
        console.log('Usuario creado:', usuarioCreado);
      } else {
        console.error('Error al crear el usuario:', response);
      }
    })
    .catch(error => {
      console.error('Error al crear el usuario:', error);
      if (error.response) {
        console.log('Respuesta de error:', error.response.data);
      }
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
          campos={todasLasColumnas.map(({ headerName: campo, field: idCampo, type, options }) => {
            if (type === 'select' ) {
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
          onGuardar={(nuevoUsuario) => {
            agregarUsuario(nuevoUsuario); // Llama a la función para agregar el usuario
            agregarFila(nuevoUsuario); // Agrega la fila a la tabla local
          }}
          
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