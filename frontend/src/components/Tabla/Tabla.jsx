import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';


  //recibe como parametro props
  export default function Tabla(props) {

    const {rows, columns, titulo} = props; //se define  props como las filas, columnas y el titulo
      return (
        <Box sx=
        {{ height: 300, 
           width: '100%', 
           fontFamily: 'Poppins',
        
        }}>

          <Typography sx={{
            marginTop: 5,
            marginBottom: 8,
            paddingLeft: 2,
            fontSize: 30,
            fontWeight: 'bold',
            fontFamily: 'Poppins',
          }}
      > 
            {titulo}    
          </Typography>

           <DataGrid
             rows={rows}
            columns={columns}
            sx = {{
            fontFamily: 'Poppins',
            alignContent: 'center',
            justifyContent: 'center',
            fontSize: 15
         }}
        
        />
      </Box> 
    );
  }