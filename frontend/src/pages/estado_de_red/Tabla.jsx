import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

const columns = [
 
    {
      field: 'nombre_sede',
      headerName: 'Sede',
      width: 250,
   
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
      headerName: 'Direccion Ip',
      width: 250,
      
    },

    {
      field: 'estado_conexion',
      headerName: 'Estado de Conexion',
      width: 250,
        
    }
  


  ];
  
  const rows = [
    { id: 1, nombre_sede: 'Sede 1', latitud: '12345', longitud: '67890' , ip: '192.168.1.1' , estado_conexion: 'Con conexion'},
    { id: 2, nombre_sede: 'Sede 2', latitud: '12345', longitud: '67890' , ip: '192.168.1.2' , estado_conexion: 'Sin conexion'},
    { id: 3, nombre_sede: 'Sede 3', latitud: '12345', longitud: '67890' , ip: '192.168.1.3' , estado_conexion: 'Con conexion'}
  
  ];
  
  export default function Tabla() {
    return (
     
      <Box sx=
      {{ height: 300, 
        width: '100%', 
        fontFamily: 'Poppins',
        
      
      }}>
 
       <Typography sx = 
       {{
        marginBottom: 10, 
        paddingLeft: 2,
        fontSize: 40, 
        fontWeight: 'bold',
        fontFamily: 'Poppins' 
    
        }}
        >
            Estado de Red
       </Typography> 

       <DataGrid
        rows={rows}
        columns={columns}
        sx = 
        {{
         fontFamily: 'Poppins',
         alignContent: 'center',
         justifyContent: 'center',
         fontSize: 15
        
        }}
        

        
        />
      </Box> 
    );
  }