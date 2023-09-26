import React from 'react';
import "./Sidebar.scss";
import UserDefault from "../../assets/img/user-default.jpg";
import { FaThLarge } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaSatelliteDish } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaDiceD6 } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaPoll } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaWifi } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaDoorOpen } from "react-icons/fa";
import { FaShuttleSpace } from "react-icons/fa6";
import RocketAltLogo from "../../assets/img/rocket-alt.png";
import { Link } from "react-router-dom";


function Sidebar() {
  return (
    <div className="sidebar">
      <div className="top-container">
        <div className="logo-container">
          <Link to="/" title='home'>
            <img className="logo" src={RocketAltLogo} alt="Logo RocketNet" />
          </Link>
        </div>
        <div className="usuario-container">
          <img className="img-usuario" src={UserDefault} alt="foto del usuario" />
          <div className="usuario-info">
            <label className="usuario-nombre">Nombre Usuario</label>
            <p className="usuario-rol">Administrador</p>
          </div>
        </div>
      </div>
      <div className="center">
        <ul>
          <p className="title-dashboard">MAIN</p>
          <li>
            <Link style={{ textDecoration: 'none' }} to="/">
              <FaThLarge className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>
          <p className="title-dashboard">GESTION</p>
          <li>
          <Link style={{ textDecoration: 'none' }} to="/gestion_usuarios">
              <FaUsersCog className="icon" />
              <span>Gestion de Usuarios</span>
            </Link>
          </li>
          <hr />
          <li>
          <Link style={{ textDecoration: 'none' }} to="/gestion_de_clientes">  
            <FaUsers className="icon" />
            <span>Gestion de Clientes</span>
            </Link> 
          </li>
          <hr />

          <li>
          <Link style={{ textDecoration: 'none' }} to="/gestion_de_cobertura">  
            <FaSatelliteDish className="icon" />
            <span>Gestion de Cobertura</span>
          </Link> 
          </li>
         {/*  GESTION DE SEDES
         <hr />
          <li>
          <Link style={{ textDecoration: 'none' }} to="/gestion_de_sedes">  
            <FaBuilding className="icon" />
            <span>Gestion de Sedes</span>
            </Link> 
          </li> */}
          <hr />

          <li>
          <Link style={{ textDecoration: 'none' }} to="/gestion_de_planes">  
            <FaDiceD6 className="icon" />
            <span>Gestion de Planes</span>
          </Link> 
          </li>
          <p className="title-dashboard">INFORMACION</p>
          
          <li>
          <Link style={{ textDecoration: 'none' }} to="/consulta_de_cobertura">  
            <FaShuttleSpace className="icon" />
            <span>Consulta de Cobertura</span>
          </Link> 
          </li> 
          <hr />
          <li>
          <Link style={{ textDecoration: 'none' }} to="/auditorias">  
            <FaClock className="icon" />
            <span>Auditorias</span>
            </Link> 
          </li>
          <hr />
          <li>
          <Link style={{ textDecoration: 'none' }} to="/reportes">  
          <FaPoll className="icon" />
          <span>Reportes</span>
          </Link> 
          </li>
          <hr />
          <li>
          <Link style={{ textDecoration: 'none' }} to="/archivos">  
          <FaFolder className="icon" />
          <span>Archivos</span>
          </Link>
          </li>

          <hr />
          <li>
          <Link style={{ textDecoration: 'none' }} to="/estado_de_red">
          <FaWifi className="icon" />
          <span>Estado de Red</span>
          </Link>
          </li>

          <p className="title-dashboard">USUARIO</p>
          {/* CHAT
          <li>
            <FaComments className="icon" />
            <span>Chat</span>
          </li>
         AJUSTES
          <hr />
          <li>
            <FaCog className="icon" />
            <span>Ajustes</span>
          </li> */}
          <hr />
          <li>

            <Link style={{ textDecoration: 'none' }} to='/login' title='Cerrar Sesion'>
              <FaDoorOpen className="icon" />
              <span>Cerrar Sesion</span>
            </Link>

          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;