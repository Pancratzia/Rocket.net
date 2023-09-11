import React, { useState, useEffect } from 'react';import './GestionCobertura.css';
import Lista from '../../components/Lista/Lista';
import Tabla from '../../components/Tabla/Tabla';
import Add from '../../components/Add/Add';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from 'axios';


const MySwal = withReactContent(Swal);

function GestionCobertura() {

  const [poligonos, setPoligonos] = useState([]);
  const [puntos, setPuntos] = useState([]);
  const [campos, setCampos] = useState(false);
  const [nombresPoligonos, setNombresPoligonos] = useState([]); // Agrega este estado



  const obtenerPoligonos = () => {
    axios.get('http://localhost:3000/api/poligonos')
      .then((response) => {
        console.log('Datos de polígonos obtenidos de la API:', response.data);
  
        const poligonosConId = response.data.map((poligono) => ({
          id: poligono.id_poligono,
          nombre_poligono: poligono.nombre_poligono,
          id_usuario: poligono.id_usuario,
        }));
  
        console.log('Polígonos después del mapeo:', poligonosConId);
  
        setPoligonos(poligonosConId);
        setFilasPoligono(poligonosConId);
      })
      .catch((error) => {
        console.error('Error al obtener polígonos:', error);
      });
  };

  const obtenerNombresPoligonos = () => {
    axios
      .get('http://localhost:3000/api/poligonos')
      .then((response) => {
        console.log('Datos de polígonos obtenidos de la API:', response.data);
  
        const nombresPoligonos = response.data.map((poligono) => poligono.nombre_poligono);
  
        console.log('Nombres de polígonos obtenidos:', nombresPoligonos);
  
        setNombresPoligonos(nombresPoligonos); // Actualiza el estado con los nombres
      })
      .catch((error) => {
        console.error('Error al obtener nombres de polígonos:', error);
      });
  };
  
  useEffect(() => {
    console.log('Efecto useEffect para obtener polígonos ejecutado');
    obtenerPoligonos();
  }, []);
  
  useEffect(() => {
    console.log('Efecto useEffect para obtener nombres de polígonos ejecutado');
    obtenerNombresPoligonos();
  }, []);


  const crearPoligono = () => {
    // Validar que se haya ingresado un nombre de polígono
    if (poligono.trim() === '') {
      MySwal.fire({
        title: <strong>Error</strong>,
        html: <i>Por favor, ingrese un nombre para el polígono</i>,
        icon: 'error',
      });
      return;
    }
  
    // Crear un objeto que represente el nuevo polígono
    const nuevoPoligono = {
      nombre_poligono: poligono, 
      id_usuario: '1' 
    };
  
    // Enviar el objeto al servidor para crear el polígono
    console.log('Datos del nuevo polígono:', nuevoPoligono);
    axios.post('http://localhost:3000/api/poligonos', nuevoPoligono)
  .then((response) => {
    if (response.status === 200) {
      obtenerPoligonos(); // Actualiza la lista de polígonos después de crear uno nuevo
      const poligonoCreado = response.data;
      const nuevoIdPoligono = poligonoCreado.id_poligono; 
    
      // Agregar el nuevo polígono a las filas con el ID generado
      setFilasPoligono([...filasPoligono, { id: nuevoIdPoligono, ...poligonoCreado }]);
    
      // Mostrar una notificación de éxito
      MySwal.fire('Polígono creado', 'El polígono se ha creado correctamente', 'success');
    
    } else {
      Swal.fire('Error', 'No se pudo crear el polígono', 'error');
    }
  })
  .catch((error) => {
    console.error('Error al crear el polígono:', error);
    Swal.fire('Error', 'Ocurrió un error al crear el polígono', 'error');
  });
  };

  const handleDeleteRow1 = (idPoligono) => {
    axios.patch(`http://localhost:3000/api/poligonos/${idPoligono}`)
      .then((response) => {
        if (response.status === 200) {
          // Muestra un mensaje de éxito en la consola
          console.log('Polígono eliminado correctamente');
        } else {
          // Muestra un mensaje de error en la consola
          console.error('No se pudo eliminar el polígono');
        }
      })
      .catch((error) => {
        // Muestra un mensaje de error en la consola
        console.error('Error al eliminar el polígono:', error);
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
      // Mostrar mensaje de error si los campos están vacíos
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
                // Mostrar mensaje de error si los campos están vacíos
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
  
    // Crear un objeto que represente el nuevo punto
    const nuevoPunto = {
      latitud: latitud,
      longitud: longitud,
      id_poligono: poligonoSeleccionado,
      // Otras propiedades del punto, si las tienes
    };
  
    // Enviar el objeto al servidor para crear el punto
    console.log('Datos del nuevo punto:', nuevoPunto);
  
    // Realizar la solicitud POST a tu API de puntos
    axios.post('http://localhost:3000/api/puntos', nuevoPunto)
    .then((response) => {
      if (response.status === 200) {
        const puntoCreado = response.data;
        const nuevoIdPunto = puntoCreado.id_punto;
  
        // Crear una nueva fila de punto con el id del punto creado
        const nuevaFilaPunto = {
          id: nuevoIdPunto, // Utiliza el id_punto devuelto por el servidor
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
    });
  };  
  const handleDeleteRow2 = (idPunto) => {
    axios.patch(`http://localhost:3000/api/puntos/${idPunto}`)
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
          }
          ]

    //columnas de la segunda tabla
        const columnasPunto = [
          {
            field: 'punto', 
            headerName: 'Punto',  
            width: 100, 
          },

          {
            field: 'poligono', 
            headerName: 'Poligono',  
             width: 150, 
          }

          ]

  //Aca se definen las filas de las tablas
           
    //filas de la primera tabla
        const [filasPoligono, setFilasPoligono] = useState ([]);


    //filas de la segunda tabla
        const [filasPunto, setFilasPunto] = useState([]);



  //Aca se definen los items de la lista (select)
              //Aca se definen los items de la lista (select)
        const  items =  [ 
          {id: '1' , name: '1'},
          {id: '2' , name: '2'}
          ]
            
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

  const [camposEditar, setCamposEditar] = useState(false); 
  const [showModal, setShowModal] = useState(false);  //Para manejar estados del modal 1
  const [showModal2, setShowModal2] = useState(false);  //Para manejar estados del modal 2


    //para mostrar el modal al presionar el icono de editar de la tabla
  
  //constante para el editar de la tabla tiene como parametro row que es la fila seleccionada. 
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

    //para eliminar la fila seleccionada
    const handleDeleteRow1 = (id) => {
      console.log("borrandofila" + id + "poligono");
      const nuevasFilas = filasPoligono.filter((fila) => fila.id !== id);
      setFilasPoligono(nuevasFilas);
    }

    const handleDeleteRow2 = (id) => {
      console.log("borrandofila" + id + "poligono");
      const nuevasFilas = filasPunto.filter((fila) => fila.id !== id);
      setFilasPunto(nuevasFilas);
    }
    
 
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
              <Tabla columns={columnasPoligono} rows={filasPoligono} actions handleEditRow={handleEditRow}  handleDeleteRow = {handleDeleteRow1}/> 
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
                  <button className='boton-cobertura' onClick={crearPunto}>Crear punto</button> 
                </div>
               
                <div className='tabla-puntos'> 
                <Tabla columns={columnasPunto} rows={filasPunto} actions handleEditRow={handleEditRow2}  handleDeleteRow = {handleDeleteRow2}/>
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
          titulo="Editar Puntos y Poligono"s
          campos={modalPunto.map(({ headerName: campo, field: idCampo, type, options }) => {
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

          
        </div>
        
    )
}


export default GestionCobertura;
