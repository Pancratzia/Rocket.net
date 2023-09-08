import React from 'react';
import "./Navbar.scss";
import Desplegable from '../Desplegable/Desplegable';

function Navbar(){
    return(
    <header>
     <nav className="navbar">
     <Desplegable/>
     </nav>   
     </header>
    )
}

export default Navbar;