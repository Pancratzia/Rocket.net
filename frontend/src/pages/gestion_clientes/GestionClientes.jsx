import React, { useEffect } from 'react';
import { useState } from 'react';
import "./GestionClientes.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from 'axios';

const MySwal = withReactContent(Swal);

function GestionClientes() {
  
  const [planesOptions, setPlanesOptions] = useState([]);
  const [usuariosOptions, setUsuariosOptions] = useState([]);
  const [clientes, setClietnes] = useState([]);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
  })

  const obtenerPlanesObtions = () => {
    axios.get('http://localhost:3000/api/planes')
    .then(response => {
      if (response.status === 200) {
        const opciones = response.data.map(opcion => ({
          value: opcion.id_plan,
          label: opcion.nombre_plan,
        }));
        setPlanesOptions(opciones);     
  } else {
    console.error('Error al obtener las opciones de planes:', response);
  }
})
.catch(error => {
  console.error('Error al obtener las opciones de planes:', error);
  });
};


useEffect(() => {
  obtenerPlanesObtions();
}, []);

const obtenerUsuariosObtions = () => {
  axios.get('http://localhost:3000/api/usuarios')
  .then(response => {
    if (response.status === 200) {
      const opciones = response.data.map(opcion => ({
        value: opcion.id_usuario,
        label: opcion.nombre_usuario,
      }));
      setUsuariosOptions(opciones);     
} else {
  console.error('Error al obtener las opciones de usuarios:', response);
}
})
.catch(error => {
console.error('Error al obtener las opciones de usuarios:', error);
});
};

useEffect(() => {
  obtenerUsuariosObtions();
}, []);
    const columnas = [
        { field: 'id', headerName: 'ID', width: 40, editable: false },

        {
          field: 'nombre',
          headerName: 'Nombre',
          width: 150,
          editable: true,
        },
    
        {
          field: 'ubicacion',
          headerName: 'Ubicacion',
          width: 150,
          editable: true,
        },
    
        {
          field: 'telefono',
          headerName: 'Telefono',
          width: 150,
          editable: true,
        },
    
        {
          field: 'correo',
          headerName: 'Correo',
          width: 150,
          editable: true,
         },
    
        {
          field: 'plan',
          headerName: 'Plan',
          description: 'Plan del cliente',
          width: 160,
          type: 'select',
          options: planesOptions,
          editable: true,
          
        },

        {
          field: 'usuario',
          headerName: 'Usuario',
          description: '',
          width: 150,
          type: 'select',
          options: usuariosOptions,
          editable: true,
          
        },

        {
            field: 'estadousuario',
            headerName: 'Estado',
            description:'Usuario activo o inactivo',
            width: 150,
            type: 'select',
            editable: true,
            options: [{
              value: 1,
              label: "Cliente Activo",
            },
            {
              value: 2,
              label: "Cliente Inactivo",
            },
          ],
          
        },

         
      ];

    
      const [filas, setFilas] = useState([]);
      const [estadoModal1, cambiarEstadoModal1] = useState(false); //estado para el modal de agregar
      const [setCampos] = useState(false);

      const [showModal, setShowModal] = useState(false);   //estado para el modal de editar

      const obtenerClientes = () => {
        axios.get('http://localhost:3000/api/clientes')
        .then(response => {
          const clientesConId = response.data.map(cliente => ({
            id: cliente.id_cliente,
            nombre: cliente.nombre,
            ubicacion: cliente.ubicacion,
            telefono: cliente.telefono,
            correo: cliente.correo,
            estadousuario: cliente.estado_usuario,
            plan: cliente.id_plan,
            usuario: cliente.id_usuario
          }));
          setClietnes(clientesConId);
          setFilas(clientesConId);
        })
        .catch(error => {
          console.error('Error al obtener clientes', error);
        });
      };
    
      useEffect(() => {
        obtenerClientes();
      }, []);

  const handleEditClient = (editedClient) => {
        swalWithBootstrapButtons.fire({
          text: "Estas seguro de que deseas editar el cliente?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          }).then (response =>{
        if (response.isConfirmed){ 
          const propertyMap = {
            id: 'id_cliente',
            nombre: 'nombre',
            ubicacion: 'ubicacion',
            telefono: 'telefono',
            correo: 'correo',
            estadousuario: 'estado_usuario',
            plan: 'id_plan',
            usuario: 'id_usuario',
          };

          const requestBody = {};

    for (const key in editedClient) {
      if (key in propertyMap) {
        requestBody[propertyMap[key]] = editedClient[key];
      } else {
        requestBody[key] = editedClient[key];
      }
    }

    axios
    .put(`http://localhost:3000/api/clientes/${editedClient.id}`, requestBody)
    .then((response) => {
      if(response.status === 200){
        obtenerClientes();
        setShowModal(false);
      } else {
        console.error("Error al editar cliente:", response);
      }
    })
    .catch((error) => {
      console.error("Error al editar el cliente:", error);
    });
    }else{
          response.dismiss === Swal.DismissReason.cancel;
    }
        
      })

      };
      const handleEditClick = (row) => {
        props.handleEditClient(row);
        handleEditClient(row);
      };
      useEffect(() => {
        obtenerClientes();
      }, []);

      const handleEditRow = (id) => {
        console.log("selecciono la fila con" + id + "en gestion de clientes");
        setCamposEditados(filas.id);
        setShowModal(true); 
       };

  const handleDeleteClick = (idCliente) =>{
    axios.patch(`http://localhost:3000/api/clientes/${idCliente}`)
      .then(response => {
        if (response.status === 200) {
          obtenerClientes();
          MySwal.fire('Success', 'Cliente eliminado correctamente', 'success')
        } else {
          Swal.fire('Error','Error al eliminar el cliente','error');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el cliente: a', error);
      });
  };
  
    
    const handleDeleteRow = (id) => {
      swalWithBootstrapButtons.fire({
        text: "Estas seguro de que deseas eliminar el cliente?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        }).then(response => {
          if (response.isConfirmed){
          console.log("borrandofila" + id + "en gestion de clientes");
          const nuevasFilas = filas.filter((fila) => fila.id !== id);
          setFilas(nuevasFilas);
          handleDeleteClick(id);
        }else {
          response.dismiss === Swal.DismissReason.cancel
          setFilas(filas);
          }
   })
    
  }
  
  const [camposEditados, setCamposEditados] = useState({});  // aca estaba definiendo para la actualizacion de la fila de la tabla 
 
  const handleChange = (event) => {
  const {id, value} = event.target;
  setCamposEditados({...camposEditados, [id]: value})
} 
  
    
  const agregarFila = (nuevoCliente) => {
    swalWithBootstrapButtons.fire({
      text: "Estas seguro de que deseas crear el cliente?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
  }).then(response => {

    if (response.isConfirmed){ 
      const formData = new FormData(); 
  
      formData.append('nombre', nuevoCliente.nombre);
      formData.append('ubicacion', nuevoCliente.ubicacion);
      formData.append('telefono', nuevoCliente.telefono);
      formData.append('correo', nuevoCliente.correo);
      formData.append('id_plan', nuevoCliente.plan);
      formData.append('id_usuario', nuevoCliente.usuario);
      formData.append('estado_usuario', nuevoCliente.estadousuario);
    axios.post('http://localhost:3000/api/clientes', formData)
    .then(response => {
      console.log('Respuesta de la solicitud:', response);
      if (response.status === 200) {
        cambiarEstadoModal1(false); 
        MySwal.fire('Exito','Has creado el cliente','success')
      } else {
        MySwal.fire('Error','Error al crear el cliente', 'error');
      }
    })
    .catch(error => {
      MySwal.fire('Error','Error al crear el cliente', 'error');
      if (error.response) {
      console.log('Respuesta de error:', error.response.data);
      }
    });
    } else {
      response.dimiss== Swal.DismissReason.cancel;
      
    }
  })
  };

    return(
        <div className="contenedor-gestion">
        <div className="titulo-clientes">
            <h1>Gestion de Clientes</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
            <button className='boton-clientes' onClick={() => cambiarEstadoModal1(!estadoModal1)}>Agregar</button>
        </div>
        <Tabla 
        columns={columnas} 
        rows={filas}
        actions
        handleEditClick={handleEditRow}
        handleDeleteRow = {handleDeleteRow}
        handleEditClient={handleEditClient}
        />

      <Add
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Agregar Cliente"
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
       return { campo, idCampo, typeCampo: 'text' };}
    })}

             filas={filas}
             setFilas={setFilas}
             onGuardar={(nuevoCliente) => {
              agregarFila(nuevoCliente);
             }}

        />

      <Add
      estado={showModal}
      cambiarEstado={setShowModal}
      titulo="Editar Cliente"
      campos={columnas.map(({ headerName: campo, field: idCampo, typeCampo }) => {
      return { campo, idCampo, typeCampo};
      })}
      camposEditados = {camposEditados}
      onChange={handleChange}
      onSave={handleEditClient}
   
        />
        </div>
    );
}
export default GestionClientes;
