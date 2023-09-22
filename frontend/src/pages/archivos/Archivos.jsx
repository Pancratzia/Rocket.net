import React from 'react';
import { useState, useEffect } from 'react';
import ModalArchivo from '../../components/ModalArchivo/ModalArchivo';
import "./Archivos.css";
import Tabla from '../../components/Tabla/Tabla';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from 'axios';

const MySwal = withReactContent(Swal);

function Archivos() {

    const [documentos, setDocumentos] = useState([]);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
      })

    const columnas =[
        {
            field: "id",
            headerName: "ID",
            width: 100,
        },
        {
            field: "tituloarchivo",
            headerName: "Titulo del archivo",
            width: 200,
            editable: true,
        },
        {
            field: "descripcionarchivo",
            headerName: "Descripcion del archivo",
            width: 250,
            editable: true,
        },
        {
            field: "idusuario",
            headerName: "Usuario",
            width: 250,
        },
        {
            field: "permiso",
            headerName: "Permiso",
            width: 250,
            editable: true,
        },
        {
            field: "fechasubida",
            headerName: "Fecha de subida",
            width: 250,
            editable: true,
        },
        {
            field: "horasubida",
            headerName: "Hora de subida",
            width: 250,
            editable: true,
        },
        {
            field: "permiso",
            headerName: "Permiso",
            description: "Permiso del archivo",
            width: 160,
            type: "select",
            editable: true,
            options: [
              {
                value: 1,
                label: "Administrador",
              },
              {
                value: 2,
                label: "Jefes de Sedes",
              },
              {
                value: 3,
                label: "Usuarios Creación de Archivos",
              },
              {
                value: 4,
                label: "Usuarios solo lectura",
              },
            ],
          },
    ]

    const obtenerDocumentos = () => {
        axios.get('http://localhost:3000/api/documentos')
          .then(response => {
            const documentosConId = response.data.map(documentos => ({
              id: documentos.id_documento,
              tituloarchivo: documentos.titulo,
              descripcionarchivo: documentos.descripcion,
              idusuario: documentos.id_usuario,
              fechasubida: documentos.fecha_subida,
              horasubida: documentos.hora_subida,
              permiso: documentos.permiso
            }));
            setDocumentos(documentosConId);
            setFilas(documentosConId);
          })
          .catch(error => {
            console.error('Error al obtener documentos:', error);
          });
      
      };
      
        useEffect(() => {
          obtenerDocumentos();
        }, []); 
      

    const [filas, setFilas] = useState([])
    const [estadoModal1, cambiarEstadoModal1] = useState(false); //estado para el modal de agregar
    const [camposEditados, setCamposEditados] = useState({}); 

   
    const agregarArchivo = (newFormData) => {
    swalWithBootstrapButtons.fire({
        text: "¿Estas seguro de que deseas agregar el Archivo?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',

    }).then(response => {
    if (response.isConfirmed){
    setFilas([...filas, newFormData]);
    cambiarEstadoModal1(false);   
    } else {
        response.dismiss == Swal.DismissReason.cancel
        }
    })
}; 

const handleEditRow = (id) => {
    console.log("selecciono la fila con" + id + "en gestion de usuarios");
    setCamposEditados(filas.id);
};

const handleEditArchivo = (editedArchivo) => {
    swalWithBootstrapButtons.fire({
      text: "Estas seguro de que deseas editar el archivo?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      }).then (response =>{
    if (response.isConfirmed){ 
      console.log(editedArchivo);
    }else{
      Swal.fire('Error', 'Error al editar el archivo', 'error')
    }
    
  })

  }


const handleChange = (event) => {
    const {id, value} = event.target;
    setCamposEditados({...camposEditados, [id]: value})
}; 

    const handleDeleteClick = (id) => {
        axios.patch(`http://localhost:3000/api/documentos/${id}`)
      .then(response => {
        if (response.status === 200) {
          obtenerDocumentos();
        } else {
          console.error("Error al eliminar el usuario:", response);
        }
      })
      .catch(error => {
        console.error('Error al eliminar el usuario: a', error);
      });

};
    const handleDeleteRow = (id) => {
        swalWithBootstrapButtons.fire({
          text: "¿Estas seguro de que deseas eliminar el Archivo?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          }).then(response => {
            if (response.isConfirmed){
            console.log("borrandofila" + id + "en Archivos");
            const nuevasFilas = filas.filter((fila) => fila.id !== id);
            setFilas(nuevasFilas);
            handleDeleteClick(id);
          }else {
            response.dismiss === Swal.DismissReason.cancel
            setFilas(filas);
        }
     })
  }

      
    return(
        <div className="contenedor-gestion">
        <div className="titulo-archivos">
            <h1>Archivos</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
            <button className='boton-archivos' onClick={() => cambiarEstadoModal1(!estadoModal1)}>Agregar</button>
        </div>
        <ModalArchivo 
        estado={estadoModal1} 
        cambiarEstado={cambiarEstadoModal1}
        

        filas = {filas}
        setFilas = {setFilas}
        subir={agregarArchivo}
        onChange = {handleChange}
        />
        
        <Tabla columns={columnas} rows={filas} actions  
        handleDeleteRow = {handleDeleteRow} 
        handleEditClick = {handleEditRow}
        handleEditArchivo = {handleEditArchivo}
        />
        </div>
    )
}

export default Archivos;