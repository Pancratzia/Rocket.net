import React from 'react';
import { useState } from 'react';
import "./GestionPlanes.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function GestionPlanes() {

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
          field: 'nombre_plan',
          headerName: 'Plan',
          width: 250
        },
    
        {
          field: 'descripcion',
          headerName: 'Descripcion',
          width: 300
        },
    
        {
          field: 'precio',
          headerName: 'Precio',
          width: 250
        },
    
        {
          field: 'estado',
          headerName: 'Estado',
          width: 150,
          type: 'select' ,
          options: ['Activo', 'Inactivo'],
            //cellclassname es una  funcion que devuelve una cadena de clase CSS 
            cellClassName: (params) => {
              if (params.value === 'Activo') { //aqui se evalua las opciones que son seleccionadas del select
                return 'estado-activo';
              } else if (params.value === 'Inactivo') {
                return 'estado-inactivo'; // a los return les aplicamos los estilos css en tabla.scss
              }
              return '';
            },      
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

  const handleEditPlan = (editedPlans) => {
        swalWithBootstrapButtons.fire({
          text: "Estas seguro de que deseas editar el plan?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          }).then (response =>{
        if (response.isConfirmed){ 
          console.log('prueba');
        }else{
          Swal.fire('Error', 'Error al editar el plan', 'error')
        }
        
      })
   }

  const handleChange = (event) => {
    const {id, value} = event.target;
    setCamposEditados({...camposEditados, [id]: value})
  } 

  const handleDeleteClick = (id) => {

  }
    
  const handleDeleteRow = (id) => {
        swalWithBootstrapButtons.fire({
          text: "Estas seguro de que deseas eliminar el plan?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          }).then(response => {
            if (response.isConfirmed){
            console.log("borrandofila" + id + "en gestion de planes");
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
        <div className="titulo-planes">
            <h1>Gestion de Planes</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
            <button className='boton-planes' onClick={() => cambiarEstadoModal1(!estadoModal1)}>Agregar</button>
        </div>
        <Tabla 
        columns={columnas} 
        rows={filas}
        actions
        handleEditClick = {handleEditRow}
        handleDeleteRow = {handleDeleteRow}
        handleEditPlan = {handleEditPlan}
        />

        <Add
            estado={estadoModal1}
            cambiarEstado={cambiarEstadoModal1}
            titulo="Agregar Plan"
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
            titulo="Editar Plan"
            campos={columnas.map(({ headerName: campo, field: idCampo, typeCampo }) => {
            return { campo, idCampo, typeCampo};
            })}
            camposEditados = {camposEditados}
            onChange={handleChange}
            onSave={handleEditPlan}
        />
      </div>
    )
}

export default GestionPlanes;