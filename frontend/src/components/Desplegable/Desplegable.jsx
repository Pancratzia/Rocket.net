import React, { useState, useEffect, useRef } from 'react'
import User from '../../assets/img/user.png'
import './Desplegable.css'



const Desplegable = () => {

  const [ open, setOpen] = useState (false);

  let menuRef = useRef(); // referencia para el click del mouse dentro del menu

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

//Arreglo para las diferentes opciones del menu desplegable

  const desplegableMenu = [ 'Cerrar sesion', 'Ajustes']

  return (
    <div className='menu-contenedor' ref = {menuRef}>
      <div className='menu-trigger'>
         <img className='user' onClick= {() => setOpen(!open)} 
          src = {User}/>

        {
          open && 
          (<div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
           <ul>
             {
               desplegableMenu.map((menu)=>( 
                <li className='menu' key = { menu }> {menu} </li> ))
             }
           </ul>
          </div>)

        }
      </div>
    </div>
  )
}

export default Desplegable;