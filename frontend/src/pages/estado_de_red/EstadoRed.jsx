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
         }
    ]

  function pingServer(ip) {
      axios.get('http://${this.state.ipAddress}')
        .then((response) => {
          if (response.status === 200) {
            this.setState({ isOnline: true });
            console.log(this.state.isOnline);
          } else {
            this.setState({ isOnline: false });
          }
        })
        .catch((error) => {
          this.setState({ isOnline: false });
        });

    };

    function useFetchData() {
    
      async function fetchData() {
        const response = await fetch("http://localhost:3000/api/sedes");
    
        if (response.status === 200) {
          const data = await response.json();
          let id = 0;
          const filas = data.map((sede) => ({
            id: id++,
            nombre_sede: sede.nombre_sede,
            latitud: sede.latitud,
            longitud: sede.longitud,
            ip: sede.ip,
            estado_conexion: "Con conexión"
          }));
          return filas;
        } else {
          throw new Error("Error al obtener los datos de la API");
        }
      };
    
      return fetchData();
    }
    const [filas, setFilas] = useState([]);
    const fetchData = useFetchData();
    useEffect(() => {
      fetchData.then((data) => {
        setFilas(data);
      });
    }, [fetchData]);

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