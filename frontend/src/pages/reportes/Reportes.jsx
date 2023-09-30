import React from 'react';
import { useState, useEffect } from 'react';
import "./Reportes.css";
import axios from 'axios';
import Tabla from '../../components/Tabla/Tabla';

function Reportes() {

    const [opcionSeleccionada, setOpcionSeleccionada] = useState(); //para manejar los estados del select
    const [columnas, setColumnas] = useState([]); //para manejar los estados de las columnas de lasnpm tablas
    

      // FILAS ESTATICAS PARA CADA TABLA

  //Filas para el reporte de clientes
    const [filasClientes, setFilasClientes] = useState([]);

  //Filas para el reporte de planes
  const [filasPlanes, setFilasPlanes] = useState([]);
  
  //Filas para el reporte de usuarios
  const [filasUsuarios, setFilasUsuarios] = useState([]);


  useEffect(() => {
    rellenarFilasPlanes();
    rellenarFilasClientes();
    rellenarFilasUsuarios();
  }, []);


  const rellenarFilasPlanes = () => {
    axios.get('http://localhost:3000/api/planes')
         .then((response) => {

          const planes = response.data.map((plan) => ({
              id: plan.id_plan,
              nombre: plan.nombre_plan,
              descripcion: plan.descripcion,
              precio: plan.precio,
              estado: plan.estado_plan
          }));

          setFilasPlanes(planes);
          })
        .catch((error) => {
        console.error('Error al obtener los planes:', error);
        });
  };

  const parsearEstadoUsuario = (int_estado) => {
   if (int_estado == 1) {
    return "Activo"
   } else if (int_estado == 2) {
    return "Inactivo"
   } else  {
    return "Estado Desconocido"
   }

  }

  const rellenarFilasClientes = () => {
    axios.get('http://localhost:3000/api/clientes')
         .then((response) => {
          const clientes = response.data.map((cliente) => (
            {
              id: cliente.id_cliente,
              nombre: cliente.nombre,
              ubicacion: cliente.ubicacion,
              telefono: cliente.telefono,
              correo: cliente.correo,
              plan: cliente.id_plan,
              estado: parsearEstadoUsuario(cliente.estado_usuario),
           }
          ));
          return clientes;
          }).then(async (clientes) => {
            clientes.forEach(async (cliente) => {
              const plan_info = await axios.get(`http://localhost:3000/api/planes/${cliente.plan}`)
              cliente.plan = plan_info.data.nombre_plan
            });
            setFilasClientes(clientes);
          })
        .catch((error) => {
        console.error('Error al obtener los Clientes:', error);
        });
  };

  const rellenarFilasUsuarios = () => {
    axios.get('http://localhost:3000/api/usuarios')
    .then(response => {
      const usuarios = response.data.map(usuario => ({
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        usuario: usuario.nombre_usuario,
        tipousuario: usuario.id_tipousuario,
        sedepartamento: usuario.id_sededepar,
        correo: usuario.correo,
        telefono: usuario.telefono,
      }));
      return usuarios;
    }).then(async (usuarios) => {
      usuarios.forEach(async (usuario) => {
        const sedeDepar = await 
        axios.get(`http://localhost:3000/api/sedesdepartamentos/${usuario.sedepartamento}`)
        usuario.sedepartamento = sedeDepar.data.sede_departamento
      });
      setFilasUsuarios(usuarios);
    })
    .catch((error)=> {
      console.error('error al obtener los usuarios:', error);
    });
  };
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