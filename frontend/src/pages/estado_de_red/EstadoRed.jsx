import React, { useState, useEffect }  from 'react';
import Tabla  from '../../components/Tabla/Tabla';
import "../estado_de_red/EstadoRed.css";
import axios from 'axios';

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

        cellClassName: (params) => {
          if (params.value === 'Conexión') { //aqui se evalua las opciones que son seleccionadas del select
            return 'estado-activo';
          } else if (params.value === 'Sin conexión') {
            return 'estado-inactivo'; // a los return les aplicamos los estilos css en tabla.scss
          }
        }
      }
    ]

async function checkConnection(ip) {
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    if (response.data.status === 'success') {
      return 'Conexión';
    } else {
      return 'Sin conexión';
    }
  } catch (error) {
    return 'Sin conexión';
  }
}

const estadoColor = (conexion) => {
  if (conexion === 'Conexion'){
    return 'green';
  }else {
    return 'red';
  }
}

  const [filas, setFilas] = useState([]);

  useEffect(() => {
    async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3000/api/sedes");

    if (response.status === 200) {
      const data = response.data;
      let id = 0;
      const filas = await Promise.all(data.map(async (sede) => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo entre solicitudes
        const estadoConexion = await checkConnection(sede.ip);
        return {
          id: id++,
          nombre_sede: sede.nombre_sede,
          latitud: sede.latitud,
          longitud: sede.longitud,
          ip: sede.ip,
          estado_conexion: estadoConexion 
        };
      }));
      setFilas(filas);
    } else {
      throw new Error("Error al obtener los datos de la API");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


    fetchData();
  }, []);

    return( 
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