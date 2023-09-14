import React from 'react';
import { useState } from 'react';
import "./GestionClientes.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function GestionClientes() {

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
  })

    const columnas = [
        { field: 'id', headerName: 'ID', width: 40, editable: false },

        {
          field: 'nombre_cliente',
          headerName: 'Nombre',
          width: 150
        },
    
        {
          field: 'ubicacion',
          headerName: 'Ubicacion',
          width: 150
        },
    
        {
          field: 'telefono',
          headerName: 'Telefono',
          width: 150
        },
    
        {
          field: 'correo',
          headerName: 'Correo',
          width: 150
        
         },
    
        {
          field: 'plan',
          headerName: 'Plan',
          width: 150,
          type: 'select',
          options: ['Plan 1', 'Plan 2', 'Plan 3']
          
        },

        {
            field: 'usuario',
            headerName: 'Usuario',
            width: 150
          
        },

        {
            field: 'estado',
            headerName: 'Estado',
            width: 150,
            type: 'select',
            options: ['Activo', 'Inactivo']
          
        }

         
      ];

    
      const [filas, setFilas] = useState([])
      const [estadoModal1, cambiarEstadoModal1] = useState(false); //estado para el modal de agregar
      const [setCampos] = useState(false);
    
      const [showModal, setShowModal] = useState(false);   //estado para el modal de editar
    
      
  const handleEditRow = (row) => {
    console.log("selecciono la fila con" + id + "en gestion de usuarios");
    setCamposEditados(filas.id);
    setShowModal(true); 
   };

  const handleEditClient = (editedClient) => {
        swalWithBootstrapButtons.fire({
          text: "Estas seguro de que deseas editar el cliente?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          }).then (response =>{
        if (response.isConfirmed){ 
          console.log('prueba');
        }else{
          Swal.fire('Error', 'Error al editar el cliente', 'error')
        }
        
      })

      }

    const [camposEditados, setCamposEditados] = useState({});  // aca estaba definiendo para la actualizacion de la fila de la tabla 
 
    const handleChange = (event) => {
    const {id, value} = event.target;
    setCamposEditados({...camposEditados, [id]: value})
  } 

  const handleDeleteClick = (id) =>{
    
  }
    
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
     
    
    const agregarFila = (nuevaFila) => {
    setFilas([...filas, nuevaFila]);
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
             onGuardar={agregarFila}

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
    )
}

export default GestionClientes;

