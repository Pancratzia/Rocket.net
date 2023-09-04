import React from "react";

import "./Add.css";


function Add({ estado, cambiarEstado, titulo, campos }) {


  return (
    <>
      {estado &&
        <div className="superposiciones">
          <div className="contenedor-modal">
            <div className="parte-arriba">
              <div className="titulo">
                <h3>{titulo}</h3>
              </div>
              <div>
                <button className="boton-cerrar-primario" onClick={() => cambiarEstado(!estado)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </button>
              </div>
            </div>
            <form className="form-grid">
              <div className='formulario-input'>
                {campos.map(({ campo, idCampo, typeCampo, options }) => (
                  <div key={idCampo}>
                    <label htmlFor={idCampo}>{campo}</label>
                    {typeCampo === 'select' ? (
                      <select id={idCampo}>
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input id={idCampo} type={typeCampo} />
                    )}
                  </div>
                ))}
                </div>
                <div className="botones">
                  <div className='boton-guardar'>
                    <button type="submit">Guardar</button>
                  </div>

                  <div className="boton-cerrar" onClick={() => cambiarEstado(!estado)}>
                    <button type="button">Cancelar</button>
                  </div>
                </div>
                
            </form>

          </div>

        </div>
      }
    </>
  );
}

export default Add;
