import React, { useState }  from 'react';
import './GestionCobertura.css';
import Lista from '../../components/Lista/Lista';
import Tabla from '../../components/Tabla/Tabla';
import Modal from '../../components/Modal/Modal';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";


const MySwal = withReactContent(Swal);

function GestionCobertura() {

// Alertas para crear poligono 
  const [poligono, setPoligono] = useState('');   
  const crearPoligono = (event) => {
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

  //Alertas para crear punto
  const crearPunto = (event) => {
    event.preventDefault();
    //verifica que los campos de latitud,longitud y la  opcion de la lista no esten vacios
    if (latitud.trim() !== '' && longitud.trim() !== '' && poligonoSeleccionado.trim() !== '') {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });
  
      swalWithBootstrapButtons.fire({
        text: "¿Estás seguro de que deseas crear el punto?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
  // Aqui se Agrega nuevo punto de tipo objeto a la tabla que contiene y concatenan la latitud y longitud ingresadas en un solo campo de la tabla
          setFilasPunto([...filasPunto, { id: filasPunto.length + 1, punto: `${latitud} - ${longitud}`, poligono: poligonoSeleccionado }]);
          swalWithBootstrapButtons.fire(
            'Se ha agregado con éxito', 
            'el punto',
            'success'
          );
         
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
          'Vaya! Hubo un error',
          'en tu solicitud de crear el punto, vuelve a intentar más tarde',
          'error'
          );
        }
      });
    } else {
      // Mostrar mensaje de error si los campos están vacíos
      MySwal.fire({
        title: <strong>Error</strong>,
        html: <i>Por favor, complete todos los campos</i>,
        icon: 'error'
      });
    }
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
            field: 'poligono',
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
        const [filasPoligono, setFilasPoligono] = useState ([
          { id: 1, poligono: 'Poligono 1'}
          ]);

    //filas de la segunda tabla
        const [filasPunto, setFilasPunto] = useState([
          { id: 1, punto: '123 - 456', poligono: 'Poligono 1'}
          ]);


  //Aca se definen los items de la lista (select)
        const  items =  [ 
          {id: '1' , name: 'Poligono 1'},
          {id: '2' , name: 'Poligono 2'}
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
    const opcionesPoligono = [
          { value: 'admin', label: 'Poligono 1' },
          { value: 'user', label: ' Poligono 2' }
             
          ];

        //TODO LO DE EDITAR DE LA TABLA

  const [camposEditar, setCamposEditar] = useState(false); 
  const [showModal, setShowModal] = useState(false);  //Para manejar estados del modal 1
  const [showModal2, setShowModal2] = useState(false);  //Para manejar estados del modal 2


    //para mostrar el modal al presionar el icono de editar de la tabla
  
  //constante para el editar de la tabla tiene como parametro row que es la fila seleccionada. 
  //aca con el setShowModal mostramos el modal 1 que corresponde a la tabla de poligonos

    const handleEditClick1 = (row) => {
      setShowModal(true);
  };
  //handle edit click 2 para mostrar el modal 2 de la tabla puntos-poligono se pasan como props en el componente tabla 
  const handleEditClick2 = (row) => {
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
              <Tabla columns={columnasPoligono} rows={filasPoligono} actions handleEditClick={handleEditClick1}  handleDeleteRow = {handleDeleteRow1}/> 
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
                <Tabla columns={columnasPunto} rows={filasPunto} actions handleEditClick={handleEditClick2}  handleDeleteRow = {handleDeleteRow2}/>
                </div>
                
             
          </div>
          <Modal
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

        <Modal
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
