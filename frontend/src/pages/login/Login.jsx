import React, { useState } from "react";
import "../login/Login.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const manejarIniciarSesion = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón

    if (usuario.trim() !== "" && password.trim() !== "") {
      MySwal.fire({
        title: <strong>¡CORRECTO!</strong>,
        html: <i>¡Sesión Iniciada!</i>,
        icon: 'success'
      });
    } else {
      // Mostrar mensaje de error si los campos están vacíos
      MySwal.fire({
        title: <strong>Error</strong>,
        html: <i>Por favor, complete todos los campos</i>,
        icon: 'error'
      });
    }
  };

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
            <input
              name="usuario"
              id="usuario"
              type="text"
              className="input"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <label className="label" htmlFor="password">Contraseña</label>
            <input
              name="password"
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn" onClick={manejarIniciarSesion}>Iniciar sesión</button>
          </form>
        </div>

        <Link to="/recuperar_password" className="link">¿Olvidaste la contraseña?</Link>
      </div>
    </>
  );
}

export default Login;