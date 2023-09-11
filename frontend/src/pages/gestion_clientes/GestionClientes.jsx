import React from 'react';
import { useState } from 'react';
import "./GestionClientes.css";
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';

function GestionClientes() {

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
        handleEditRow={handleEditRow}
        handleDeleteRow = {handleDeleteRow}
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

export default GestionClientes;

