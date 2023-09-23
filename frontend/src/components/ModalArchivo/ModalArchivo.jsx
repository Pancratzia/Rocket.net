import React from "react";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaFileUpload } from "react-icons/fa";
import "./ModalArchivo.css";
import axios from "axios";

function ModalArchivo({estado, cambiarEstado, subir}) {
const [formData, setFormData] = useState({});
const fileInputRef = useRef(null);
const [file, setFile] = useState();
const [titulo, setTitulo] = useState("");
const [filas, setFilas] = useState([]);
const [descripcion, setDescripcion] = useState("");
const [opcion, setOpcion] = useState();

const handleFile=(event)=> {
    setFile(event.target.files[0])
    setTitulo(event.target.files[0].name) //para obtener el nombre del archivo y guardarlos en el estado titulo (setTitulo)
    console.log(event.target.files[0])
}


const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!file) {
      console.error('No se ha seleccionado un archivo');
      return;
    }
  
    // Crear un objeto FormData para enviar el archivo y otros datos al servidor
    const formData = new FormData();
    formData.append('documento', file);
    formData.append('titulo', titulo);
    formData.append('descripcion', descripcion);
    formData.append('id_usuario', "1"); 
    formData.append('permiso', opcion);
  
    // Realizar la solicitud POST para subir el archivo
    axios
      .post('http://localhost:3000/api/documentos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('Archivo subido exitosamente', response);
        } else {
          console.error('Error al subir el archivo:', response);
        }
      })
      .catch((error) => {
        console.error('Error al subir el archivo:', error);
      });
  
    // Restablecer los campos después de la subida
    setDescripcion('');
    setTitulo('');
    setOpcion('');
    setFilas([...filas, formData]);
    cambiarEstado(false);
    console.log('Archivo subido');
  };
  

const handleChange = (e) =>{
    const selectedValue = e.target.value;
    setOpcion(selectedValue);
}

const handleFileInputClick = () =>{
    fileInputRef.current.click();
}

    return (
        <>
        {estado &&
        <div className="contenedor-archivos">
        <div className="contenedor-formulario">
        <div className="contenedor-cerrar-archivo">
            <button
                className="cerrar-archivo"
                onClick={() => cambiarEstado(!estado)}
                >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16">
                <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                />
                </svg>
            </button>
        </div>
        <div className="titulo-modal-archivo">
        <h1>Agregar un nuevo archivo</h1>
        </div>
        <div className="caja">
        <input className="subir-archivo" type="file" name="archivo" hidden ref={fileInputRef} onChange={handleFile}/>
        <h1>Haz click aca para subir el archivo</h1>
        <FaFileUpload className="icon-subir" onClick={handleFileInputClick}/>
        <h2>Explora tu carpeta y carga tu archivo</h2>
        </div>
        <div className="contenedor-campos">
            <form className = "formulario-style" onSubmit={handleSubmit}>
            <label className = "nombre-archivo">Titulo del archivo</label>
            <input className="input-archivo" id="nombre" onChange={(e) => setTitulo(e.target.value)} value={titulo}></input>
            <label className = "descripcion-archivo">Descripcion del archivo</label>
            <input className="input-archivo" onChange={(e) => setDescripcion(e.target.value)}></input>
            <label className = "permiso-archivo">Permiso a otorgar</label>
            <select onChange= {(e) => setOpcion(e.target.value)} className="select-archivo"> 
            <option value="">Seleccione un permiso</option> 
            <option value="0">Usuario 0</option>
            <option value="1">Usuario 1</option>
            <option value="2">Usuario 2</option>
            <option value="3">Usuario 3</option>
            </select>
            </form>
        </div>
        <div className="contenedor-botones-archivos">
        <button className="boton-subir" onClick={handleSubmit}>Subir</button>
        <button className="boton-cancelar" onClick={() => cambiarEstado(!estado)}>Cancelar </button>
        </div>
        </div>
        </div>
        }
    </>
 );
}

export default ModalArchivo;