import React from 'react'
import { Link } from 'react-router-dom'
import '../recuperar_password/Recuperar_Password.css';
import { FaMagnifyingGlass } from "react-icons/fa6"

function Recuperar_Password() {
  return (
    <div className="contenedor-recuperar">
        <form className="formulario-recuperar">
          <div className="titulo-recuperar">
            <h1>Has olvidado tu contraseña?</h1>
            <p>Ingresa la informacion correspondiente en los campos de abajo</p>
          </div>

          <div className="campos">
            <div className="campo1">
            <label className="labelre" htmlFor="usuario">Ingresa tu usuario</label>
            <input name="usuario" id="usuario" type="text" className="inputre" />           
            </div>

            <FaMagnifyingGlass className='busqueda-icon'/>

            <div className="campo2">
            <label className="labelre" htmlFor="pregunta">Pregunta de seguridad</label>
            <input name="respuesta" id="respuesta" type="text" className="inputre2" />
            </div>
          </div>

          <div className="titulo-recuperar">
            <h1>Nueva contraseña</h1>
            <p>Recuerda colocar digitos en mayuscula, alfanumericos y caracteres especiales para mayor seguridad</p>
          </div>

          <div className="campos2">
            <div className="campo3">
            <label className="labelre" htmlFor="password">Contraseña nueva</label>
            <input name="password" id="password" type="password" className="inputre" />
            </div>

            <div className="campo4">
            <label className="labelre" htmlFor="password2">Repite contraseña nueva</label>
            <input name="password2" id="password2" type="password" className="inputre2" />
            </div>
          </div>

            <button className="btn">Validar</button>
        </form>

        <Link to="/Login" className="link">Volver al inicio de sesion</Link>
      </div>
  );
};

export default Recuperar_Password