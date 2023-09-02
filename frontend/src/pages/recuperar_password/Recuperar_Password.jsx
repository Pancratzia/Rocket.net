import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Recuperar_Password.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function Recuperar_Password() {
  const [usuario, setUsuario] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  const manejarFormulario = (event) => {
    event.preventDefault();

    if (usuario.trim() === "" || respuesta.trim() === "" || contraseña.trim() === "" || confirmarContraseña.trim() === "") {
      MySwal.fire({
        title: <strong>Oops! Lo siento. No pudimos procesar tu solicitud</strong>,
        html: <i>Por favor intentar nuevamente al seleccionar "Olvidaste tu contraseña"</i>,
        icon: "error",
      });
    } else {
      MySwal.fire({
        title: <strong>¡Haz creado una nueva contraseña exitosamente!</strong>,
        html: <i>Puedes intentar iniciar sesión con tu nueva contraseña</i>,
        icon: "success",
      });
    }
  };

  return (
    <div className="contenedor-recuperar">
      <form className="formulario-recuperar" onSubmit={manejarFormulario}>
        <div className="titulo-recuperar">
          <h1>¿Has olvidado tu contraseña?</h1>
          <p>Ingresa la información correspondiente en los campos de abajo</p>
        </div>

        <div className="campos">
          <div className="campo">
            <label className="label" htmlFor="usuario">
              Ingresa tu usuario
            </label>

            <div className="field">
              <input
                name="usuario"
                id="usuario"
                type="text"
                className="input withIcon"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
              <FaMagnifyingGlass className="busqueda-icon" />
            </div>
          </div>

          <div className="campo">
            <label className="label" id="pregunta" htmlFor="respuesta">
              Pregunta de seguridad
            </label>

            <div className="field">
              <input
                name="respuesta"
                id="respuesta"
                type="text"
                className="input"
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="titulo-recuperar">
          <h1>Nueva contraseña</h1>
          <p>
            <b>Recordatorio</b> escribe dígitos en mayúscula, tipo alfanuméricos y carácteres
            especiales para mayor seguridad en la contraseña
          </p>
        </div>

        <div className="campos">
          <div className="campo">
            <label className="label" htmlFor="contraseña">
              Nueva contraseña
            </label>
            <div className="field">
              <input
                name="contraseña"
                id="contraseña"
                type="contraseña"
                className="input"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </div>
          </div>

          <div className="campo">
            <label className="label" htmlFor="confirmarcontraseña">
              Repite la contraseña
            </label>
            <div className="field">
              <input
                name="confirmarcontraseña"
                id="confirmarcontraseña"
                type="contraseña"
                className="input"
                value={confirmarContraseña}
                onChange={(e) => setConfirmarContraseña(e.target.value)}
              />
            </div>
          </div>
        </div>

        <button className="btn" type="submit">
          Guardar cambios
        </button>
      </form>

      <Link to="/Login" className="link">
        Volver al inicio de sesión
      </Link>
    </div>
  );
}

export default Recuperar_Password;