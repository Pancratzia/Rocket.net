import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useTheme from '@mui/material/styles/useTheme'; //nueva importacion

export default function Lista({ items, label}) {
  const [lista, setLista] = React.useState('');

  const handleChange = (event) => {
    setLista(event.target.value);
  };

  const theme = useTheme();

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 260, 
      //para el responsive de la lista se le da un ancho de 180
        [theme.breakpoints.down('480')]: { minWidth: 180},
       
         }}>
        <InputLabel
         sx={{
          color: 'white',
          fontFamily: 'Poppins',
          fontSize: '18px',
          [theme.breakpoints.down('480')]: { fontSize: '12px' } //cuando la pantalla es de 480px se estable fontSize:12px
         }}>
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={lista}
          onChange={handleChange}
          sx={{
            backgroundColor: '#2cab73',
            fontFamily: 'Poppins',
            color: 'black',
            fontSize: '15px'
            
            
           
          }}
        >
         
          <MenuItem sx=
          {{ color: 'black',
             fontFamily: 'Poppins',

            
          
          }} >
              <em>Ninguno</em>
          </MenuItem>
          {items.map(item => (
            <MenuItem value={item.id} sx = {{ color: 'black', fontFamily: 'Poppins'}}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}


