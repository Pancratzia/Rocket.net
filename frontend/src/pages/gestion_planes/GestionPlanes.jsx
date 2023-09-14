import React, { useEffect, useState } from 'react';
import './GestionPlanes.css';
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import axios from 'axios';

function GestionPlanes() {
  const [planesConId, setPlanes] = useState([]);
  const [filas, setFilas] = useState([]);
  const [nombresPlan, setNombresPlan] = useState([]);


  useEffect(() => {
    obtenerPlanes();
  }, []);

  const obtenerPlanes = () => {
    axios.get('http://localhost:3000/api/planes')
      .then((response) => {
        console.log('Datos de planes obtenidos de la API:', response.data);

        
        const planesConId = response.data.map((plan) => ({
          id: plan.id_plan,
          nombre_plan: plan.nombre_plan,
          descripcion: plan.descripcion,
          precio: plan.precio,
          estado: plan.estado_plan,
        }));
        console.log('Planes después del mapeo:', planesConId);

        setPlanes(planesConId);
        setFilas(planesConId);
      })
      .catch((error) => {
        console.error('Error al obtener planes:', error);
      });
  };

  const obtenerNombresPlanes = () => {
    axios.get('http://localhost:3000/api/planes')
      .then((response) => {
        console.log('Datos de planes obtenidos de la API:', response.data);
  
        const nombresPlan = response.data.map((planes) => planes.nombre_plan);
  
        console.log('Nombres de planess obtenidos:', nombresPlan);
  
        setNombresPlan(nombresPlan);
      })
      .catch((error) => {
        console.error('Error al obtener nombres de polígonos:', error);
      });
  };

  const agregarFila = (nuevoPlan) => {
    nuevoPlan.estado_plan = 1;
    axios.post('http://localhost:3000/api/planes', nuevoPlan)
      .then(response => {
        console.log('Respuesta de la solicitud:', response);
        if (response.status === 201) {
          const planCreado = response.data.plan;
          cambiarEstadoModal1(false);
          console.log('Plan creado:', planCreado);
          // Agregar el plan creado a las filas
          setFilas([...filas, planCreado]);
        } else {
          console.error('Error al crear el plan:', response);
        }
      })
      .catch(error => {
        console.error('Error al crear el plan:', error);
        if (error.response) {
          console.log('Respuesta de error:', error.response.data);
        }
      });
  };

  useEffect(() => {
    console.log('Efecto useEffect para obtener nombres de planes ejecutado');
    obtenerNombresPlanes();
  }, []);

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
    
      const [estadoModal1, cambiarEstadoModal1] = useState(false); //estado para el modal de agregar
      const [setCampos] = useState(false);
    
      const [showModal, setShowModal] = useState(false);   //estado para el modal de editar
    
      
      const handleEditPlan = (plan) => {
        axios.put(`http://localhost:3000/api/planes/${plan.id}`, plan)
          .then((response) => {
            if (response.status === 200) {
              obtenerPlanes(); // Vuelve a cargar la lista de planes después de editar
              setShowModal(false); // Cierra el modal de edición
            } else {
              console.error("Error al editar el plan:", response);
            }
          })
          .catch((error) => {
            console.error("Error al editar el plan:", error);
          });
      };
      


      const handleEditRow = (row) => {
       
        setShowModal(true); 
    
     
      };

      const handleDeletePlan = (id_plan) => {
        axios.patch(`http://localhost:3000/api/planes/${id_plan}`)
          .then((response) => {
            if (response.status === 200) {
              obtenerPlanes(); // Vuelve a cargar la lista de planes después de eliminar
            } else {
              console.error("Error al eliminar el plan:", response);
            }
          })
          .catch((error) => {
            console.error("Error al eliminar el plan:", error);
          });
      };      
    
        const handleDeleteRow = (id) => {
        console.log("borrandofila" + id + "en gestion de sedes");
        const nuevasFilas = filas.filter((fila) => fila.id !== id);
        setFilas(nuevasFilas);
        handleDeletePlan(id);
      }

      
    
    
        const [camposEditados, setCamposEditados] = useState({}); 
     
    


      
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
            rows={planesConId} // Asegúrate de que 'planesConId' tenga 'id' único en cada fila
            actions
            handleEditRow={handleEditPlan}
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