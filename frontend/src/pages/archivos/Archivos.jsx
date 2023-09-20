import React from 'react';
import "./Archivos.css";
import Tabla from '../../components/Tabla/Tabla';

function Archivos() {

    const columnas =[
        {
            field: "idarchivo",
            headerName: "ID",
            width: 100,
            editable: true,
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
    ]

    const [filas, setFilas] = useState([])
    const [estadoModal1, cambiarEstadoModal1] = useState(false); //estado para el modal de agregar

   
    const agregarArchivo = (newFormData) => {
    swalWithBootstrapButtons.fire({
        text: "¿Estas seguro de que deseas eliminar el Archivo?",
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

    const handleDeleteClick = (id) => {

    }
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
            <button className='boton-archivos'>Agregar</button>
        </div>
        <Tabla columns={columnas} rows={filas}/>
        </div>
    )
}

export default Archivos;