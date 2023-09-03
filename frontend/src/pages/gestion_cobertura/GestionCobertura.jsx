import React, { useState }  from 'react';
import './GestionCobertura.css';
import Lista from '../../components/Lista/Lista';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function GestionCobertura() {
  
           // Alertas para crear poligono 
        const [poligono, setPoligono] = useState('');   
        const crearPoligono = (event) => {
            event.preventDefault(); 
                //alerta con preguntas de confirmacion
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

            //aca se definen los items de la lista
            const  items = 
            [ {id: '1' , name: 'Poligono 1'},
              {id: '2' , name: 'Poligono 2'}
            ]

            //contenido modulo gestion de cobertura
    return(
        <div className='contenedor-principal'>
              <div className='titulo'>
                <span>Gestion de cobertura</span>
                </div>
       
            <div className='contenedor-izquierdo'>
            <input className='input' type='text' name='poligono' id='poligono' onChange={(e) => setPoligono(e.target.value)}/>
            <button className='boton' onClick={crearPoligono}>Crear poligono</button>
                <div className='tabla-poligonos'>
                
               </div>
            </div>


            <div className='contenedor-derecho'>
                <h3>Ingresar la latitud</h3>
                <input className='input2' type='text' name='latitud' id='latitud' onChange={(e) => setLatitud(e.target.value)}/>
                <button className='boton' onClick={crearCoordenadas}>Agregar</button>
                 <h3>Ingresar la longitud</h3>
                <input className='input2' type='text' name='longitud' id='longitud' onChange={(e) => setLongitud(e.target.value)}/>
                <button className='boton' onClick={crearCoordenadas}>Agregar</button>
                
                <div className = 'lista-btn'> 
                <Lista  items = {items} label = 'Seleccionar poligono'/> 
                <button className='boton2'>Crear punto</button>
                </div>
               
               
                <div className='tabla-puntos'>
                  
                </div>

            </div>
          
        </div>
        
    )
}


export default GestionCobertura;