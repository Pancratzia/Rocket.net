import React, { useState, useEffect } from 'react';import './GestionCobertura.css';
import Lista from '../../components/Lista/Lista';
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from 'axios';


const MySwal = withReactContent(Swal);

function GestionCobertura() {

  const [poligonosedit, setpoligonosedit] = useState([])
  const [poligonos, setPoligonos] = useState([]);
  const [puntos, setPuntos] = useState([]);
  const [campos, setCampos] = useState(false);
  const [nombresPoligonos, setNombresPoligonos] = useState([]); // Agrega este estado



  const obtenerPoligonos = () => {
    axios.get('http://localhost:3000/api/poligonos')
      .then((response) => {
  
        const poligonosConId = response.data.map((poligono) => ({
          id: poligono.id_poligono,
          nombre_poligono: poligono.nombre_poligono,
          id_usuario: poligono.id_usuario,
        }));
  
  
        setPoligonos(poligonosConId);
        setFilasPoligono(poligonosConId);
      })
      .catch((error) => {
        console.error('Error al obtener poligonos:', error);
      });
  };

  const obtenerNombresPoligonos = () => {
    axios
      .get('http://localhost:3000/api/poligonos')
      .then((response) => {
  
        const nombresPoligonos = response.data.map((poligono) => poligono.nombre_poligono);
  
  
        setNombresPoligonos(nombresPoligonos); // Actualiza el estado con los nombres
      })
      .catch((error) => {
        console.error('Error al obtener nombres de poligonos:', error);
      });
  };
  
  useEffect(() => {
    obtenerPoligonos();
  }, []);
  
  useEffect(() => {
    obtenerNombresPoligonos();
  }, []);


  const crearPoligono = () => {
    // Validar que se haya ingresado un nombre de poligono
    if (poligono.trim() === '') {
      MySwal.fire({
        title: <strong>Error</strong>,
        html: <i>Por favor, ingrese un nombre para el poligono</i>,
        icon: 'error',
      });
      return;
    }
  
    // Crear un objeto que represente el nuevo poligono
    const nuevoPoligono = {
      nombre_poligono: poligono, 
      id_usuario: '1' 
    };
  
    // Enviar el objeto al servidor para crear el poligono
    axios.post('http://localhost:3000/api/poligonos', nuevoPoligono)
  .then((response) => {
    if (response.status === 200) {
      obtenerPoligonos(); // Actualiza la lista de poligonos después de crear uno nuevo
      const poligonoCreado = response.data;
      const nuevoIdPoligono = poligonoCreado.id_poligono; 
    
      // Agregar el nuevo poligono a las filas con el ID generado
      setFilasPoligono([...filasPoligono, { id: nuevoIdPoligono, ...poligonoCreado }]);
    
      // Mostrar una notificación de éxito
      MySwal.fire('Poligono creado', 'El poligono se ha creado correctamente', 'success');
    
    } else {
      Swal.fire('Error', 'No se pudo crear el poligono', 'error');
    }
  })
  .catch((error) => {
    console.error('Error al crear el poligono:', error);
    Swal.fire('Error', 'Ocurrió un error al crear el poligono', 'error');
  });
  };

  const handleDeleteRow1 = (idPoligono) => {
    axios.delete(`http://localhost:3000/api/poligonos/${idPoligono}`)
      .then((response) => {
        if (response.status === 200) {
          // Muestra un mensaje de éxito en la consola
          console.log('Poligono eliminado correctamente');
        } else {
          // Muestra un mensaje de error en la consola
          console.error('No se pudo eliminar el poligono');
        }
      })
      .catch((error) => {
        // Muestra un mensaje de error en la consola
        console.error('Error al eliminar el poligono:', error);
      });
  };

  const handleEditPoligono = (editPoligono) => {
    const idPoligonoAModificar = editPoligono.id;
    console.log('ID del poligono a modificar:', idPoligonoAModificar);
    const nuevoNombrePoligono = editPoligono.nombre_poligono;
  
    // Verificar si el poligono existe en la base de datos antes de editar  

  
    // Crear un objeto con las modificaciones
    const modificacionesPoligono = {
      nombre_poligono: nuevoNombrePoligono,
    };
  
    // Actualizar el estado con los cambios pendientes de edición
    // Enviar la solicitud PUT al servidor para guardar los cambios
    axios.put(`http://localhost:3000/api/poligonos/${idPoligonoAModificar}`, modificacionesPoligono)
      .then((response) => {
        if (response.status === 200) {
          console.log('Poligono actualizado correctamente en el servidor');
        } else {
          console.error('No se pudo actualizar el poligono en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el poligono:', error);
      });
  };
// Alertas para crear poligono 
  const [poligono, setPoligono] = useState('');   
  const crearPoligonos = (event) => {
    event.preventDefault(); 
      //Alerta con preguntas de confirmacion para crear poligonos
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
          },
          buttonsStyling: false
          })
          if (poligono.trim() !== '') {
            swalWithBootstrapButtons.fire({
              text: "Estas seguro de que deseas crear el poligono?",
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Si',
              cancelButtonText: 'No',
                    
              }).then((result) => {
                    if (result.isConfirmed) {
                      //añade filas a la tabla de poligono
                      setFilasPoligono([...filasPoligono, { id: filasPoligono.length + 1, poligono }]);
                      swalWithBootstrapButtons.fire(
                      'Se ha agregado con exito', 
                      'el poligono',
                      'success'
                     )
                    } else if (
                     
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      swalWithBootstrapButtons.fire(
                      'Vaya! Hubo un error',
                      'en tu solicitud de crear el poligono, vuelve a intentar mas tarde',
                      'error'
                     )
                    }
                  })
             
              } else {
      // Mostrar mensaje de error si los campos están vacios
              MySwal.fire({
                  title: <strong>Error</strong>,
                  html: <i>Por favor, complete el campo</i>,
                  icon: 'error'
               });
              }
            };

      //Alertas para latitud y longitud
          const [latitud, setLatitud ] = useState('');   
          const [longitud, setLongitud ] = useState('');   
          const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
              },
                buttonsStyling: false
              })

          const crearCoordenadas = (event) => {
            event.preventDefault(); 
            //condicional para los campos de latitud y longitud
           if (latitud.trim() !== "" && longitud.trim() !== "") {
                swalWithBootstrapButtons.fire({
                    text: "Estas seguro de que deseas agregar la latitud y longitud?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Si',
                    cancelButtonText: 'No',
                 
                    
                  }).then((result) => {
                    if (result.isConfirmed) {
                     swalWithBootstrapButtons.fire(
                      'Se ha agregado con exito el', 
                      'la latitud y longitud',
                      'success'
                      )
                    } else if (
                      result.dismiss === Swal.DismissReason.cancel
                    ) {
                      swalWithBootstrapButtons.fire(
                 
                      'Vaya! Hubo un error',
                      'en tu solicitud de agregar la latitud y longitud, vuelve a intentar mas tarde',
                      'error'
                       
                      )
                    }
                  })
              } else {
                // Mostrar mensaje de error si los campos están vacios
                MySwal.fire({
                  title: <strong>Error</strong>,
                  html: <i>Por favor, complete todos los campos</i>,
                  icon: 'error'
                });
              }
            };



            const obtenerPuntos = () => {
              axios.get('http://localhost:3000/api/puntos')
                .then((response) => {
                  const puntos = response.data.map((punto) => ({
                    id: punto.id_punto, // Utiliza el id_punto proporcionado por la base de datos
                    punto: `${punto.latitud} - ${punto.longitud}`,
                    poligono: punto.id_poligono,
                  }));
                  setFilasPunto(puntos);
                })
                .catch((error) => {
                  console.error('Error al obtener puntos:', error);
                });
            };

            useEffect(() => {
              obtenerPuntos();
            }, []);
  //Alertas para crear punto

  const crearPunto = () => {
    const latitudNum = parseFloat(latitud);
    const longitudNum = parseFloat(longitud);
  
    if (isNaN(latitudNum) || isNaN(longitudNum)) {
      // Mostrar un mensaje de error si las entradas no son números válidos
      console.error('Latitud y longitud deben ser números válidos.');
      return;
    }
  
    const nombrePoligonoSeleccionado = poligonoSeleccionado;
    
    // Buscar el id_poligono correspondiente al nombre seleccionado
    const idPoligonoSeleccionado = poligonos.find((poligono) => poligono.nombre_poligono === nombrePoligonoSeleccionado)?.id;
  
    if (idPoligonoSeleccionado) {
      // Crear el objeto para el nuevo punto
      const nuevoPunto = {
        latitud: latitudNum,
        longitud: longitudNum,
        id_poligono: idPoligonoSeleccionado, 
      };

      
    // Realizar la solicitud POST a la API de puntos
    axios.post('http://localhost:3000/api/puntos', nuevoPunto)
    .then((response) => {
      if (response.status === 200) {
        const puntoCreado = response.data;
        const nuevoIdPunto = puntoCreado.id_punto;
  
        // Crear una nueva fila de punto con el id del punto creado
        const nuevaFilaPunto = {
          id: nuevoIdPunto, 
          punto: `${latitud} - ${longitud}`,
          poligono: poligonoSeleccionado,
        };
  
        // Agrega la nueva fila de punto a filasPunto
        setFilasPunto((prevFilas) => [...prevFilas, nuevaFilaPunto]);
  
        // Mostrar una notificación de éxito
        MySwal.fire('Punto creado', 'El punto se ha creado correctamente', 'success');
  
        // Limpiar los campos de latitud y longitud
        setLatitud('');
        setLongitud('');
      } else {
        Swal.fire('Error', 'No se pudo crear el punto', 'error');
      }
    })
    .catch((error) => {
      console.error('Error al crear el punto:', error);
      Swal.fire('Error', 'Ocurrió un error al crear el punto', 'error');
      // Agregar esta linea para mostrar detalles del error en la consola
      console.log('Detalles del error:', error.response);
    });
  }
  };   


  const handleDeleteRow2 = (idPunto) => {
    axios.delete(`http://localhost:3000/api/puntos/${idPunto}`)
      .then((response) => {
        if (response.status === 200) {
          // Filtra los puntos para eliminar el punto con el ID correspondiente
          const nuevosPuntos = puntos.filter((punto) => punto.id !== idPunto);
          
          // Actualiza los puntos en el estado
          setPuntos(nuevosPuntos);
  
          // Muestra un mensaje de éxito en la consola
          console.log('Punto eliminado correctamente');
        } else {
          // Muestra un mensaje de error en la consola
          console.error('No se pudo eliminar el punto');
        }
      })
      .catch((error) => {
        // Muestra un mensaje de error en la consola
        console.error('Error al eliminar el punto:', error);
      });
    
  };
  

  const handleEditPunto = (editedPunto) => {
  
    // Separar la cadena "121 - 131" en latitud y longitud
    const [latitudStr, longitudStr] = editedPunto.punto.split(' - ');
  
    // Convertir las cadenas en números
    const latitud = parseFloat(latitudStr);
    const longitud = parseFloat(longitudStr);
  
    // Verificar si la conversión fue exitosa
    if (!isNaN(latitud) && !isNaN(longitud)) {
      // Enviar la solicitud PUT al servidor para guardar los cambios
      axios
        .put(`http://localhost:3000/api/puntos/${editedPunto.id}`, {
          latitud: latitud,
          longitud: longitud,
          id_poligono: editedPunto.poligono,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log('Punto actualizado correctamente en el servidor');
          } else {
            console.error('No se pudo actualizar el punto en el servidor');
          }
        })
        .catch((error) => {
          console.error('Error al actualizar el punto:', error);
        });
    } else {
      console.error('Nueva latitud o longitud no son números válidos.');
      // Puedes mostrar un mensaje de error o realizar alguna acción de manejo de errores aquí.
    }
  };

  const [camposEditados, setCamposEditados] = useState({});  // aca estaba definiendo para la actualizacion de la fila de la tabla 
 
  const handleChange = (event) => {
    const {id, value} = event.target;
    setCamposEditados({...camposEditados, [id]: value})
  } 
  
  //Aca se define las columnas de las  2 tablas
    //columnas de la primera tabla
        const columnasPoligono  = [
          {
            field: 'id',
            headerName: 'ID',
            width: 50,    
          },
              
          {
            field: 'nombre_poligono',
            headerName: 'Poligono',
            width: 150,    
            editable: true
          }
          ]

    //columnas de la segunda tabla
        const columnasPunto = [
          {
            field: 'punto', 
            headerName: 'Punto',  
            width: 100, 
            editable: true
          },

          {
            field: 'poligono', 
            headerName: 'Poligono',  
            width: 150, 
            editable: true
          }

          ]

    const [filasPoligono, setFilasPoligono] = useState ([]);
    const [filasPunto, setFilasPunto] = useState([]);

    const items = nombresPoligonos.map((nombre) => ({
      id: nombre,
      name: nombre,
      }));
            
///////////Modales del modulo se definen las props/////////////////
    //modal 1: Editar poligono
        const modalPoligono = [
          {
            field: 'id',
            headerName: 'ID',
            width: 100,
            editable: true,
          },

          {
            field: 'poligono',
            headerName: 'Poligono',
            width: 100,
            editable: true,
          }
            
          ]

    //modal 2:  Editar Puntos - Poligono
        const modalPunto = [   
          {
            field: 'latitud',
            headerName: 'Latitud',
            width: 100,
            editable: true,
          },

          {
            field: 'longitud',
            headerName: 'Longitud',
            width: 100,
            editable: true,
          },

          {
            field: 'poligono',
            headerName: 'Poligono',
            width: 100,
            type: 'select', //para el tipo de input
            options: ['Poligono 1', 'Poligono 2', ' Poligono 3'], //esto es para los que son tipo select se deben añadir estos campos con las opciones
            editable: true,
          }
            
          ]
    //Aca van las opciones del select (lista) para el modal 
    const [poligonoSeleccionado, setPoligonoSeleccionado] = useState('');   //para el manejo de los estados


        //TODO LO DE EDITAR DE LA TABLA
  const [showModal, setShowModal] = useState(false);  //Para manejar estados del modal 1
  const [showModal2, setShowModal2] = useState(false);  //Para manejar estados del modal 2
  
  //aca con el setShowModal mostramos el modal 1 que corresponde a la tabla de poligonos
const handleEditRow = (id) => {
      console.log("selecciono la fila con" + id + "en gestion de usuarios");
      setShowModal(true);
  };
  //handle edit click 2 para mostrar el modal 2 de la tabla puntos-poligono se pasan como props en el componente tabla 
  const handleEditRow2 = (id) => {
    console.log("selecciono la fila con" + id + "en gestion de usuarios");
    setShowModal2(true);
  };
     
    // Contenido del modulo
    return(
          
        <div className='contenedor-principal-cob'>
          <div className='titulo-cobertura'>
            <h1>Gestion de cobertura</h1>
            <hr  className='linea-cobertura'/> 
          </div>
       
          <div className='contenedor-izquierdo-cob'>
              <div className='flex-cobertura'>
              <input className='input-cobertura' type='text' name='poligono' id='poligono' onChange={(e) => setPoligono(e.target.value)}/>
              <button className='boton-cobertura' onClick={crearPoligono}>Crear poligono</button>
              </div>
          
            <div className='tabla-poligonos'>
              <Tabla columns={columnasPoligono} rows={filasPoligono} actions handleEditRow={handleEditRow} handleEditPoligono= {handleEditPoligono}  handleDeleteRow = {handleDeleteRow1}/> 
            </div>
            
               
        </div>


            <div className='contenedor-derecho-cob'>
              <h3>Ingresar la latitud</h3>
                  <div className='flex-cobertura'>
                  <input className='input-cobertura' type='text' name='latitud' id='latitud' onChange={(e) => setLatitud(e.target.value)}/>
                  
                  </div>
                
              <h3>Ingresar la longitud</h3>
                  <div className='flex-cobertura'>
                  <input className='input-cobertura' type='text' name='longitud' id='longitud' onChange={(e) => setLongitud(e.target.value)}/>
                  
                  </div>
           
                <div className = 'lista-btn'> 
                  <Lista  items = {items} label = 'Seleccionar poligono' value={poligonoSeleccionado} setValue={setPoligonoSeleccionado}/>  
                  <button className='boton-cobertura2' onClick={crearPunto}>Crear punto</button> 
                </div>
               
                <div className='tabla-puntos'> 
                <Tabla columns={columnasPunto} rows={filasPunto} actions handleEditRow={handleEditRow2} handleEditPunto={handleEditPunto}  handleDeleteRow = {handleDeleteRow2}/>
                </div>
                
             
          </div>
          <Add
          estado={showModal}
          cambiarEstado={setShowModal}
          titulo="Editar Poligono"
          campos={modalPoligono.map(({ defaultValue: campo, field: idCampo, type, options }) => {
            if (type === 'select') {
              return {
                campo,
                idCampo,
                typeCampo: 'select',
                options: options,
              };
            }

            else {
              return { campo, idCampo, typeCampo: 'text' };
            }
          })}
          />

        <Add
          estado={showModal2}
          cambiarEstado={setShowModal2}
          titulo="Editar Puntos y Poligono"
          campos={modalPunto.map(({ headerName: campo, field: idCampo, typeCampo }) => {
          return { campo, idCampo, typeCampo};
            })}
          camposEditados = {camposEditados}
          onChange={handleChange}
          onSave={handleEditPunto}
          />  
        </div>
    )
}


export default GestionCobertura;
