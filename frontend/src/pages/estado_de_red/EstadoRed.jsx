import React, { useState, useEffect }  from 'react';
import Tabla  from '../../components/Tabla/Tabla';
import "../estado_de_red/EstadoRed.css";

function  EstadoRed(){

    const columnas  = [
        {
        field: 'nombre_sede', //campo
        headerName: 'Sede',  //nombre de la columna
        width: 250, // el ancho que ocupa
        },

        {
        field: 'latitud',
        headerName: 'Latitud',
        width: 250,    
        },

        {
        field: 'longitud',
        headerName: 'Longitud',
        width: 250,
        },

        {
        field: 'ip',
        headerName: 'Direccion IP',
        width: 250,
        },

        {
        field: 'estado_conexion',
        headerName: 'Estado de Conexion',
        width: 250,
         }
    ]
    function useFetchData() {
      // La función `useFetchData()` es una función asíncrona
    
      async function fetchData() {
        // Realiza la petición fetch a la API
        const response = await fetch("http://localhost:3000/api/sedes");
    
        // Comprueba si la respuesta es correcta
        if (response.status === 200) {
          // Decodifica el cuerpo de la respuesta como JSON
          const data = await response.json();
    
          // Crea un array de objetos con los datos de la API
          let id = 0;
          const filas = data.map((sede) => ({
            id: id++,
            nombre_sede: sede.nombre_sede,
            latitud: sede.latitud,
            longitud: sede.longitud,
            ip: sede.ip,
            estado_conexion: "Con conexión"
          }));
    
          // Devuelve el array de objetos
          return filas;
        } else {
          // La respuesta no es correcta
          // Devuelve un error
          throw new Error("Error al obtener los datos de la API");
        }
      };
    
      // Devuelve la promesa de la función `fetchData()`
      return fetchData();
    }
    const [filas, setFilas] = useState([]);
    const fetchData = useFetchData();
    useEffect(() => {
      // Cuando la promesa esté resuelta
      fetchData.then((data) => {
        // Establece el valor de la variable `filas` con los datos de la API
        setFilas(data);
      });
    }, [fetchData]);

    return(
        //div contenedor del componente tabla donde se le pasan las tres props (titulo, columnas y filas 
        <div className='contenedor-red'> 
        <div className='titulo-red'>
            <h1>Estado de Red</h1>
        <hr/>
        </div>
        <Tabla columns={columnas} rows={filas}/> 
        </div>
    )
}

export default EstadoRed;