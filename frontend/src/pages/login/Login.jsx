import React, { useState } from "react";
import "../login/Login.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
    if (response.isConfirmed){
    //Aca colocas el codigo para la integracion
    //respuesta del axios
    Swal.fire('Exito', 'Inicio de sesion exitoso', 'success');
    } else {
    Swal.fire('Oops!', 'Hubo un error en el inicio de sesion', 'error')
    }
    response.dismiss === Swal.DismissReason.cancel;
  };



  return (
      <div className="contenedor-login">
        <div className="contenedor-form">
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
            <button className="btn" onClick={manejarLogin}>Iniciar sesión</button>
            
          </form>
        </div>
       
        <Link to="/recuperar_password" className="link">¿Olvidaste la contraseña?</Link>
      </div>
  );
}

export default Login;