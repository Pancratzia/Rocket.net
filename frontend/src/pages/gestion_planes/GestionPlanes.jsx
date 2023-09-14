import React, { useEffect, useState } from 'react';
import './GestionPlanes.css';
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import axios from 'axios';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

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
      const [camposEditados, setCamposEditados] = useState({}); 
      const [showModal, setShowModal] = useState(false);   //estado para el modal de editar
  
      const handleEditRow = (row) => {
      console.log("selecciono la fila con" + id + "en gestion de usuarios");
      setCamposEditados(filas.id);
      setShowModal(true); 
      };

      const handleEditPlan = (editedPlans) => {
        swalWithBootstrapButtons.fire({
          text: "Estas seguro de que deseas editar el plan?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          }).then (response =>{
        if (response.isConfirmed){ 
          console.log('prueba');
        }else{
          Swal.fire('Error', 'Error al editar el plan', 'error')
        }
        
      })
   }

  const handleChange = (event) => {
    const {id, value} = event.target;
    setCamposEditados({...camposEditados, [id]: value})
  } 

  const handleDeletePlan = (id_plan) => {
    axios.patch(`http://localhost:3000/api/planes/${id_plan}`)
      .then((response) => {
        if (response.status === 200) {
          obtenerPlanes(); 
        } else {
          console.error("Error al eliminar el plan:", response);
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el plan:", error);
      });
  }; 
    
  const handleDeleteRow = (id) => {
        swalWithBootstrapButtons.fire({
          text: "Estas seguro de que deseas eliminar el plan?",
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
