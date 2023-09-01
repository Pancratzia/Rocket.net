import React from 'react';
import "./Add.css";

function Add(props) {
  const { onSave, onCancel } = props;

  return (
    <div className="modal-container">
      <div className="modal">
        <h2>Agregar Usuario</h2>

        <form className="form-grid">
          <div className='formulario-input'>
            <div className="form-row">
              <label htmlFor="nombre">Nombre: </label>
              <input type="text" id="nombre" />
            </div>
          <div className="form-row">
            <label htmlFor="apellido">Apellido:</label>
            <input type="text" id="apellido" />
          </div>
          <div className="form-row">
            <label htmlFor="extencionTelefonica">Extención telefonica:</label>
            <input type="text" id="extencionTelefonica" />
          </div>
          <div className="form-row">
            <label htmlFor="telefono">Número telefónico:</label>
            <input type="number" id="telefono" />
          </div>
          <div className="form-row">
            <label htmlFor="cedula">Cédula:</label>
            <input type="number" id="cedula" />
          </div>
          <div className="form-row">
            <label htmlFor="correo">Correo:</label>
            <input type="email" id="correo" />
          </div>
          <div className="form-row">
            <label htmlFor="clave">Clave:</label>
            <input type="text" id="clave" />
          </div>
          <div className="form-row">
            <label htmlFor="tipoUsuario">Tipo:</label>
            <select id="tipoUsuario">
              <option value="tipo1">Tipo 1</option>
              <option value="tipo2">Tipo 2</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="departamento">Departamento:</label>
            <select id="departamento">
              <option value="tipo1">Departamento 1</option>
              <option value="tipo2">Departamento 2</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="usuario">Usuario:</label>
            <input type="text" id="usuario" />
          </div>
          <div className="form-row">
            <label htmlFor="pregunta">Pregunta:</label>
            <select id="pregunta">
              <option value="pregunta1">Pregunta 1</option>
              <option value="pregunta2">Pregunta 2</option>
            </select>
          </div>
          <div className="form-row">
            <label htmlFor="respuesta">Respuesta:</label>
            <input type="text" id="respuesta" />
          </div>
          </div>
          <div className="botones">
            <div className='boton-guardar'>
              <button type="submit" onClick={onSave}>Guardar</button>
            </div>

            <div className="boton-cerrar">
              <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;