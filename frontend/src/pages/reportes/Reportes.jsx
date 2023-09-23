import React from 'react';
import { useState } from 'react';
import "./Reportes.css";
import Tabla from '../../components/Tabla/Tabla';

function Reportes() {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(); //para manejar los estados del select
    const [columnas, setColumnas] = useState([]); //para manejar los estados de las columnas
    const [filas, setFilas] = useState([]); //para manejar los estados de las filas

    //funcion para la seleccion de las opciones del select y que campos deben aparecen en la tabla
    const handleSelect = (e) => {
        const opcion = e.target.value;

        if (opcion === "opcion-clientes") {
            const columnas = [
              
                {
                  field: "nombre",
                  headerName: "Nombre",
                  width: 190
                },
            
                {
                  field: "ubicacion",
                  headerName: "Ubicacion",           
                  width: 200
                },
            
                {
                  field: "telefono",
                  headerName: "Telefono",
                  width: 200
                },
            
                {
                  field: "correo",
                  headerName: "Correo",
                  width: 220
                
                },

                {
                  field: "plan",
                  headerName: "Plan",
                  width: 200
                  
                },

                {
                  field: "estado",
                  headerName: "Estado de Servicio",
                  width: 200
                  
                }
                
                ];
               
                setColumnas(columnas);
            
                } 

        else if (opcion === "opcion-planes") {
            const columnas = [  
             
                {
                  field: "nombre",
                  headerName: "Nombre",
                  width: 300
                },
            
                {
                  field: "descripcion",
                  headerName: "Descripcion",           
                  width: 350
                },
            
                {
                  field: "precio",
                  headerName: "Precio",
                  width: 300
                },
            
                {
                  field: "estado",
                  headerName: "Estado de Servicio",
                  width: 300
                
                },
                ];
                setColumnas(columnas);

             
                } 
        
            else if (opcion === "opcion-usuarios") {
                const columnas = [
                    
                {
                  field: "nombre",
                  headerName: "Nombre",
                  width: 180
                },
                
                {
                  field: "usuario",
                  headerName: "Usuario",           
                  width: 180
                 
                },
                
                {
                  field: "tipo-usuario",
                  headerName: "Tipo de Usuario",
                  width: 220
                },

                {
                  field: "sede-depar",
                  headerName: "Sede - Departamento",
                  width: 300
                },
                
                {
                  field: "correo",
                  headerName: "Correo",
                  width: 200
                },
    
                {
                  field: "telefono",
                  headerName: "Telefono",
                  width: 200
                }
                    
                ];
                setColumnas(columnas); 
         
                 }
                    setOpcionSeleccionada(opcion); // aca se actualiza el estado de la opcion seleccionada del select
      }

    return(
        <div className="contenedor-gestion">
        <div className="titulo-reportes">
            <h1>Reportes</h1>
            <hr/>
        </div>
        <div className='contenedor-busqueda'>
        <select className='opcion-reportes' name="Selecciona la opcion" onChange={handleSelect}>
       
        <option value="">Selecciona la opcion</option>
        <option value="opcion-clientes"> Clientes </option>
        <option value="opcion-planes"> Planes </option>
        <option value="opcion-usuarios"> Usuarios </option>

        </select>
        </div>
       
        {(opcionSeleccionada === "opcion-clientes") && <Tabla columns={columnas} rows={filas} />}
        {(opcionSeleccionada === "opcion-planes") && <Tabla columns={columnas} rows={filas} />}
        {(opcionSeleccionada === "opcion-usuarios") && <Tabla columns={columnas} rows={filas} />}
        </div>
    )
}

export default Reportes;