import React, { useEffect, useState } from 'react';
import './GestionPlanes.css';
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import jwtDecode from 'jwt-decode';

const MySwal = withReactContent(Swal);

function GestionPlanes() {
  const token = localStorage.getItem("jwt");

  if (!token) {
    window.location.href = '/login';
    return null;
}

  const payload = jwtDecode(token);
  const idUsuario = payload.idUser;
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      id_usuario: idUsuario
    },
  };
  
  const [planesConId, setPlanes] = useState([]);
  const [filas, setFilas] = useState([]);
  const [nombresPlan, setNombresPlan] = useState([]);


  useEffect(() => {
    obtenerPlanes();
  }, []);

  const obtenerPlanes = () => {
    axios.get('http://localhost:3000/api/planes',config)
      .then((response) => {
        const planesConId = response.data.map((plan) => ({
          id: plan.id_plan,
          nombre_plan: plan.nombre_plan,
          descripcion: plan.descripcion,
          precio: plan.precio,
          estado: plan.estado_plan,
        }));

        setPlanes(planesConId);
        setFilas(planesConId);
      })
      .catch((error) => {
        console.error('Error al obtener planes:', error);
      });
  };

  const obtenerNombresPlanes = () => {
    axios.get('http://localhost:3000/api/planes',config)
      .then((response) => {
  
        const nombresPlan = response.data.map((planes) => planes.nombre_plan);
  
        setNombresPlan(nombresPlan);
      })
      .catch((error) => {
        console.error('Error al obtener nombres de polígonos:', error);
      });
  };

  const agregarFila = (nuevoPlan) => {
    swalWithBootstrapButtons.fire({
      text: "¿Estas seguro de que deseas crear el plan?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then(response => {
      if (response.isConfirmed){
    nuevoPlan.estado_plan = nuevoPlan.estado;
    axios.post('http://localhost:3000/api/planes', nuevoPlan,config)
      .then(response => {
        if (response.status === 200) {
        const planCreado = response.data.plan;
        cambiarEstadoModal1(false);
        setFilas([...filas, planCreado]);
        MySwal.fire('¡Exito!', 'Plan creado correctamente', 'success');
        } else {
          Swal.fire('Error', 'Error al crear el plan', 'error');
        }
      })
      .catch(error => {
        Swal.fire('Error', 'Error al crear el plan', error);
        if (error.response) {
          console.log('Respuesta de error:', error.response.data);
        }
      });
      } else {
        response.dimiss== Swal.DismissReason.cancel;
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    obtenerNombresPlanes();
  }, []);

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
          editable: true,
          width: 250
        },
    
        {
          field: 'descripcion',
          headerName: 'Descripcion',
          editable: true,
          width: 300
        },
    
        {
          field: 'precio',
          headerName: 'Precio',
          editable: true,
          width: 250
        },
    
        {
          field: 'estado',
          headerName: 'Estado',
          width: 150,
          type: 'select' ,
          options: [
            

            {
              value:1,
              label: "Activo",
            },
            {
              value:2,
              label: "Inactivo"
            },
  
          ],
            cellClassName: (params) => {
              if (params.value === 1) { //aqui se evalua las opciones que son seleccionadas del select
                return 'estado-activo';
              } else if (params.value === 2) {
                return 'estado-inactivo'; // a los return les aplicamos los estilos css en tabla.scss
              }
              return '';
            }, 
        }      
  ];
    
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
          text: "¿Estas seguro de que deseas editar el plan?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          }).then (response =>{
        if (response.isConfirmed){ 
            const propertyMap = {
              id: 'id_plan',
              nombre_plan: 'nombre_plan',
              descripcion: 'descripcion',
              estado: 'estado_plan',
              precio: 'precio',
            };
    
            const requestBody = {};
    
          for (const key in editedPlans) {
            if (key in propertyMap) {
              requestBody[propertyMap[key]] = editedPlans[key];
            } else {
              requestBody[key] = editedPlans[key];
            }
        }
            axios.put(`http://localhost:3000/api/planes/${editedPlans.id}`, requestBody,config)
              .then((response) => {
                if (response.status === 200) {
                  obtenerPlanes(); 
                  setShowModal(false);
                  Swal.fire('¡Exito!', 'El plan se ha editado correctamente', 'success') 
                  window.location.reload();
                } else {
                  Swal.fire('Error', 'Error al editar el plan', 'error')
                }
              })
              .catch((error) => {
                Swal.fire('Error', 'Error al editar el plan', error)
              });
        }else{
              response.dismiss === Swal.DismissReason.cancel
              window.location.reload();
        }
        
      })
   }

  const handleChange = (event) => {
    const {id, value} = event.target;
    setCamposEditados({...camposEditados, [id]: value})
  } 

  const handleDeletePlan = (id_plan) => {
    axios.patch(`http://localhost:3000/api/planes/${id_plan}`,config)
      .then((response) => {
        if (response.status === 200) {
          obtenerPlanes(); 
          Swal.fire('¡Exito!', 'Has eliminado el plan', 'success')
        } else {
          Swal.fire('Error', 'Error al eliminar el plan', 'error')
        }
      })
      .catch((error) => {
        Swal.fire('Error', 'Error al eliminars el plan', error)
      });
  }; 
    
  const handleDeleteRow = (id) => {
        swalWithBootstrapButtons.fire({
          text: "¿Estas seguro de que deseas eliminar el plan?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          }).then(response => {
            if (response.isConfirmed){
            console.log("borrandofila" + id + "en gestion de planes");
            const nuevasFilas = filas.filter((fila) => fila.id !== id);
            setFilas(nuevasFilas);
            handleDeletePlan(id);
          }else {
            response.dismiss === Swal.DismissReason.cancel
            setFilas(filas);
        }
     })
  }
       
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
            handleEditRow={handleEditRow}
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