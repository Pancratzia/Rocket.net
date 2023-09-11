import React from 'react';
import { useState } from 'react';
import "./GestionPlanes.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';

function GestionPlanes() {

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
          width: 250
        },
    
        {
          field: 'precio',
          headerName: 'Precio',
          width: 250
        },
    
        {
          field: 'estado',
          headerName: 'Estado',
          width: 250,
          type: 'select',
          options: ['Activo', 'Inactivo']
        
        }
 
        
      ];
    
      const [filas, setFilas] = useState([])
      const [estadoModal1, cambiarEstadoModal1] = useState(false); //estado para el modal de agregar
      const [setCampos] = useState(false);
    
      const [showModal, setShowModal] = useState(false);   //estado para el modal de editar
    
      
      const handleEditRow = (row) => {
       
        setShowModal(true); 
    
     
      };
    
        const handleDeleteRow = (id) => {
        console.log("borrandofila" + id + "en gestion de sedes");
        const nuevasFilas = filas.filter((fila) => fila.id !== id);
        setFilas(NuevasFilas);
      }
    
    
        const [camposEditados, setCamposEditados] = useState({}); 
     
    
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
        handleEditRow={handleEditRow}
        handleDeleteRow = {handleDeleteRow}
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
   
        />


        </div>
    )
}

export default GestionPlanes;