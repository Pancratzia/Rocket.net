import React, { useState, useEffect, useRef } from 'react'
import User from '../../assets/img/user.png'
import './Desplegable.css'
import {Link} from 'react-router-dom'


const Desplegable = () => {

  const [ open, setOpen] = useState (false);

  let menuRef = useRef(); // referencia para el click del mouse dentro del menu

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

//Arreglo para las diferentes opciones del menu desplegable

  const desplegableMenu = [ 'Cerrar sesion']

  function LimpiarStorege(){
    localStorage.clear();
  }

  return (
    <div className='menu-contenedor' ref = {menuRef}>
      <div className='menu-trigger'>
         <img className='user' onClick= {() => setOpen(!open)} 
          src = {User}/>

        {
          open && 
          (<div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
           <ul className = 'dropdown-ul'>
             {
               desplegableMenu.map((menu)=>( 
                <Link to = {menu === 'Ajustes' ? '/ajustes' : '/login'} style={{ textDecoration: 'none', color:'white' }} className='menu' key = { menu } onClick={() => {LimpiarStorege();}}> {menu} </Link> ))
             }
           </ul>
          </div>)

        }
      </div>
    </div>
  )
}

export default Desplegable;