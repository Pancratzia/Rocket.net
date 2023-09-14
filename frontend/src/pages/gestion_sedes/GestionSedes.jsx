import React from 'react';
import { useState } from 'react';
import "./GestionSedes.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function GestionSedes() {

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
      field: 'nombre_sede',
      headerName: 'Sede',
      width: 200
    },

    {
      field: 'latitud',
      headerName: 'Latitud',
      width: 200
    },

    {
      field: 'longitud',
      headerName: 'Longitud',
      width: 200
    },

    {
      field: 'ip',
      headerName: 'Direccion IP',
      width: 200
    
     },

    {
      field: 'departamento',
      headerName: 'Departamento',
      width: 200,
      type: 'select',
      options: ['RRHH', 'Informatica', 'Ventas']
      
    }
    
    
  ];

  const [filas, setFilas] = useState([])
  const [estadoModal1, cambiarEstadoModal1] = useState(false); //estado para el modal de agregar
  const [setCampos] = useState(false);
  const [camposEditados, setCamposEditados] = useState({}); 
  const [showModal, setShowModal] = useState(false);   //estado para el modal de editar

  
  const handleEditRow = (row) => {
  console.log("selecciono la fila con" + id + "en gestion de usuarios");
  setCamposEditados(filas.id);
  setShowModal(true); 
  };

  const handleEditSede = (editedSedes) => {
    swalWithBootstrapButtons.fire({
      text: "Estas seguro de que deseas editar la sede?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      }).then (response =>{
    if (response.isConfirmed){ 
      console.log('prueba');
    }else{
      Swal.fire('Error', 'Error al editar la sede', 'error')
    }  
  })
}

const handleChange = (event) => {
  const {id, value} = event.target;
  setCamposEditados({...camposEditados, [id]: value})
} 

const handleDeleteRow = (id) => {
    swalWithBootstrapButtons.fire({
    text: "Estas seguro de que deseas eliminar la sede?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
    }).then(response => {
    if (response.isConfirmed){
    console.log("borrandofila" + id + "en gestion de sedes");
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
        <div className="titulo-sedes">
            <h1>Gestion de Sedes</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
            <button className='boton-sedes' onClick={() => cambiarEstadoModal1(!estadoModal1)}>Agregar</button>
        </div>
        <div className='contenedor-tabla'>
        <Tabla 
        columns={columnas} 
        rows={filas}
        actions  
        handleEditClick = {handleEditRow}
        handleDeleteRow = {handleDeleteRow}
        handleEditSede = {handleEditSede}
        />
        </div>

        <Add
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Agregar Sede"
            campos={columnas.map(({ headerName: campo, field: idCampo, type, options }) => {
                if (type === 'select') {
                 return {
                        campo,
                        idCampo,
                        typeCampo: 'select',
                        options: options,
                        };
                    } else {
                    return { campo, idCampo, typeCampo: 'text' };}
      })}
             filas={filas}
             setFilas={setFilas}
             onGuardar={agregarFila}
        />
        
        <Add
            estado={showModal}
            cambiarEstado={setShowModal}
            titulo="Editar Sede"
            campos={columnas.map(({ headerName: campo, field: idCampo, typeCampo }) => {
              return { campo, idCampo, typeCampo};
              })}
              camposEditados = {camposEditados}
              onChange={handleChange}
              onSave={handleEditSede}  
        />    
    </div>
   )
}

export default GestionSedes;