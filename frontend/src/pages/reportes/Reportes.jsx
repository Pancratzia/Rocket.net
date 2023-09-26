import React from 'react';
import { useState } from 'react';
import "./Reportes.css";
import Tabla from '../../components/Tabla/Tabla';

function Reportes() {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(); //para manejar los estados del select
    const [columnas, setColumnas] = useState([]); //para manejar los estados de las columnas de lasnpm tablas
    

      // FILAS ESTATICAS PARA CADA TABLA

  //Filas para el reporte de clientes
    const [filasClientes, setFilasClientes] = useState([
    { id:1, nombre: "cliente 01", ubicacion: "Ubicación 1", telefono: "1234", correo: "cliente1@gmail.com", plan: "Plan 1", estado: "Activo" },
    { id:2, nombre: "cliente 02", ubicacion: "Ubicación 2", telefono: "5678", correo: "cliente2@gmail.com", plan: "Plan 2", estado: "Inactivo" }
   
  ]);

  //Filas para el reporte de planes
    const [filasPlanes, setFilasPlanes] = useState([
    {id: 1, nombre: "Plan 1", descripcion: "50 mbps", precio: "50$", estado: "Activo" },
    {id: 2, nombre: "Plan 2", descripcion: "100 mbps", precio: "80$", estado: "Inactivo" }

  ]);
  
  //Filas para el reporte de usuarios
    const [filasUsuarios, setFilasUsuarios] = useState([
    {id: 1, nombre:"Pepito", usuario: "usuario 01", tipoUsuario: "Usuario tipo 1", sedeDepar: "Barquisimeto - RRHH", correo: "pepito@gmail.com" , telefono: "1234"},
    {id: 2, nombre:"Pepita", usuario: "usuario 02", tipoUsuario: "Usuario tipo 2", sedeDepar: "Barquisimeto - Ventas", correo: "pepita@gmail.com" , telefono: "5678"}

  ]);

    //funcion para la seleccion de las opciones del select y que campos deben aparecen en la tabla
    const handleSelect = (e) => {
        const opcion = e.target.value;

        if (opcion === "opcion-clientes") {
            const columnas = [

                { field: "id", headerName: "ID", width: 40, editable: false },
              
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
                  width: 200,
                  cellClassName: (params) => {
                    if (params.value === "Activo") { 
                      return 'estado-activo';
                    } else if (params.value === "Inactivo") {
                      return 'estado-inactivo'; 
                    }
                    return '';
                  }, 
                  
                }
                
                ];
               
                setColumnas(columnas); //actualiza las columnas
                setFilasClientes([...filasClientes]);  //actualiza las filas
            
                } 

        else if (opcion === "opcion-planes") {
            const columnas = [  

                { field: "id", headerName: "ID", width: 40, editable: false },
             
                {
                  field: "nombre",
                  headerName: "Nombre",
                  width: 300
                },
            
                {
                  field: "descripcion",
                  headerName: "Descripcion",           
                  width: 300
                },
            
                {
                  field: "precio",
                  headerName: "Precio",
                  width: 300
                },
            
                {
                  field: "estado",
                  headerName: "Estado de Servicio",
                  width: 300,
                  //ESTO ES PARA MOSTRAR EL BACKGROUND ROJO O VERDE DEPENDIENDO DEL ESTADO
                  cellClassName: (params) => {
                    if (params.value === "Activo") { 
                      return 'estado-activo';
                    } else if (params.value === "Inactivo") {
                      return 'estado-inactivo'; 
                    }
                    return '';
                  }, 
                
                },
                ];
                setColumnas(columnas);
                setFilasPlanes([...filasPlanes]); 

             
                } 
        
            else if (opcion === "opcion-usuarios") {
                const columnas = [

                { field: "id", headerName: "ID", width: 40, editable: false },  
                    
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
                  field: "tipoUsuario",
                  headerName: "Tipo de Usuario",
                  width: 220
                },

                {
                  field: "sedeDepar",
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
                setFilasUsuarios([...filasUsuarios]); 
         
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
       
        <option value=""></option>
        <option value="opcion-clientes"> Clientes </option>
        <option value="opcion-planes"> Planes </option>
        <option value="opcion-usuarios"> Usuarios </option>

        </select>
        </div>
       
        {(opcionSeleccionada === "opcion-clientes") && <Tabla columns={columnas} rows={filasClientes} />}
        {(opcionSeleccionada === "opcion-planes") && <Tabla columns={columnas} rows={filasPlanes} />}
        {(opcionSeleccionada === "opcion-usuarios") && <Tabla columns={columnas} rows={filasUsuarios} />}
        </div>
    )
}

export default Reportes;