import React, { useState } from "react";
import "../login/Login.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from 'axios';

const MySwal = withReactContent(Swal);

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
  })

  const manejarLogin = (e) => {
    e.preventDefault();

    const data = {
      nombre_usuario: usuario,
      clave: password,
    };

    axios
      .post("http://localhost:3000/api/login", data)
      .then((response) => {
        if (response.data.jwt) {
          localStorage.setItem("jwt", response.data.jwt);
          // localStorage.setItem("usuarioenSesion", response.data.idUser)
          // setTimeout(() => {
          //   Swal.fire("Éxito", "Inicio de sesión exitoso", "success");
          //   window.location.href = '/';
          // }, 60000);
            Swal.fire("Éxito", "Inicio de sesión exitoso", "success");
            window.location.href = '/';
        }
        // console.log(response)
      })
      .catch((error) => {
        Swal.fire("Error", "Hubo un error en el inicio de sesión", "error");
        console.log(error);
      });
  };



  return (
      <div className="contenedor-login">
        <div className="contenedor-form">
          <div className="titulo">
            <h1>Bienvenido</h1>
            <h2>Inicia sesión para continuar</h2>
          </div>

          <form className="form" method="post">
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
            <button type="button" className="btn" onClick={manejarLogin}>Iniciar sesión</button>
            
          </form>
        </div>
       
        <Link to="/recuperar_password" className="link">¿Olvidaste la contraseña?</Link>
      </div>
  );
}

export default Login;