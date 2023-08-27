import  React from 'react';
import './EstadoRed.css';
import { useState , useEffect} from 'react'; //para manejar estados de la tabla y obtener la direccion IP





const  tablaEstadoRed = [
  {NombreSede: 'Sede 1', Latitud: '12345', Longitud: '67890', DireccionIp: '192.168.1.1', EstadoDeConexion: 'Con conexion' },
  {NombreSede: 'Sede 2', Latitud: '12345', Longitud: '67890', DireccionIp: '192.168.1.1', EstadoDeConexion: 'Sin conexion' },
  {NombreSede: 'Sede 3', Latitud: '12345', Longitud: '67890', DireccionIp: '192.168.1.1', EstadoDeConexion: 'Se desconoce la conexion' },
  
] 
//ejemplo de registros para llenar la tabla, 


const EstadoRed = ()  => {
  

  const [tablaRegistros, setTablaRegistros] = useState(tablaEstadoRed); // para actualizar la tabla

  //para obtener la direccion ip 
  useEffect(() => {
    fetch("https://api.ipify.org?format=json") //api 
      .then((response) => response.json()) 
      .then((data) => {
        setTablaRegistros(tablaEstadoRed.map((registro) => {
         // registro.DireccionIp = data.ip; 
         //introduce la direccion ip obtenida por la api en el campo de direccion ip de la tabla
         console.log(data.ip);
         return registro;
        }));
      });
  }, []);

  //para obtener las coordenadas de latitud y longitud y manejar los estados
  const [ubicacion, setUbicacion] = useState({latitud: null, longitud: null});


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) //se obtiene la posicion del usuario 
    {
      setUbicacion({
        latitud: position.coords.latitude,  //se obtiene la coordenada de latitud
        longitud: position.coords.longitude //se obtiene la coordenada de longitud 
      });
    });
  }, []);


  useEffect(() => {
    setTablaRegistros(tablaEstadoRed.map(registro => {
    //  registro.Latitud = ubicacion.latitud; //actualiza o introduce las coordenadas en los registros de la tabla 
    // registro.Longitud = ubicacion.longitud;
    console.log(ubicacion.latitud);
    console.log(ubicacion.longitud); //muestra las coordenadas de latitud y longitud en consola
      return registro;
    }));
  }, [ubicacion]);
  
  return (
  
  <div className='contenedor'>
    <span className='titulo'> <strong>Estado de Red</strong></span>
    
    <div className='tabla'>
      <table>
        <thead>
          <tr>
            <th> Sede </th>
            <th> Latitud </th>
            <th> Longitud </th>
            <th> Direccion Ip </th>
            <th> Estado de Conexion</th>
          </tr>
        </thead>

        <tbody>
          
          { tablaRegistros.map(registro => (
            <tr key = {registro.NombreSede}>
              <td> {registro.NombreSede} </td>
              <td> {registro.Latitud} </td>
              <td> {registro.Longitud}</td>
              <td> {registro.DireccionIp}</td>
              <td> {registro.EstadoDeConexion} </td>
            </tr>
              ))}
        </tbody>
      </table>

    </div>
   </div>

  
  )
}

export default EstadoRed;