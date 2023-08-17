import React from "react";
import "../login/Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="contenedor-login">
        <div className="contenedor-formulario">
          <div className="titulo">
            <h1>Bienvenido</h1>
            <h2>Inicia sesión para continuar</h2>
          </div>

          <form className="form">
            <label className="label" htmlFor="usuario">Usuario</label>
            <input name="usuario" id="usuario" type="text" className="input" />
            <label className="label" htmlFor="password">Contraseña</label>
            <input
              name="password"
              id="password"
              type="password"
              className="input"
            />
            <button className="btn">Iniciar sesion</button>
          </form>
        </div>

        <Link to="/recuperar_password" className="link">¿Olvidaste la contraseña?</Link>
      </div>
    </>
  );
}

export default Login;
