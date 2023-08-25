import React from 'react';
import "./navbar.scss";
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