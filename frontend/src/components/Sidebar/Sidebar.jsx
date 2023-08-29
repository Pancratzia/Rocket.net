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
import { FaRocket } from "react-icons/fa";
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
            <FaUsersCog className="icon" />
            <span>Gestion de Usuarios</span>
          </li>
          <hr />
          <li>
            <FaUsers className="icon" />
            <span>Gestion de Clientes</span>
          </li>
          <hr />
          <li>
            <FaSatelliteDish className="icon" />
            <span>Gestion de Cobertura</span>
          </li>
          <hr />
          <li>
            <FaBuilding className="icon" />
            <span>Gestion de Sedes</span>
          </li>
          <hr />
          <li>
            <FaDiceD6 className="icon" />
            <span>Gestion de Planes</span>
          </li>
          <p className="title-dashboard">INFORMACION</p>
       
          <hr />
          <li>
            <FaClock className="icon" />
            <span>Auditorias</span>
          </li>
          <hr />
          <li>
            <FaPoll className="icon" />
            <span>Reportes</span>
          </li>
          <hr />
          <li>
            <FaFolder className="icon" />
            <span>Archivos</span>
          </li>

          <hr />
          <li>
            <Link style={{ textDecoration: 'none' }} to="/estado_de_red">
              <FaWifi className="icon" />
              <span>Estado de Red</span>
            </Link>
          </li>

          <p className="title-dashboard">USUARIO</p>
          <li>
            <FaComments className="icon" />
            <span>Chat</span>
          </li>
          <hr />
          <li>
            <FaCog className="icon" />
            <span>Ajustes</span>
          </li>
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