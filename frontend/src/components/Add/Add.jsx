import React from "react";

import "./Add.css";


const Add = ({ 
  estado,
  cambiarEstado,
  titulo,
  campo1, idCampo1,
  typeCampo1,
  campo2,
  idCampo2,
  typeCampo2,
  campo3,
  idCampo3,
  typeCampo3,
  campo4,
  idCampo4,
  typeCampo4,
  campo5,
  idCampo5,
  typeCampo5,
  campo6,
  idCampo6,
  typeCampo6,
  campo7,
  idCampo7,
  typeCampo7,
  campo8,
  idCampo8,
  typeCampo8,
  campo9,
  idCampo9,
  typeCampo9,
  campo10,
  idCampo10,
  typeCampo10,
  campo11,
  idCampo11,
  typeCampo11,
  campo12,
  idCampo12,
  typeCampo12 
}) => {


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
                <div className="form-row">
                  <label htmlFor={idCampo1}>{campo1}</label>
                  <input type={typeCampo1} id={idCampo1} />
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo2}>{campo2}</label>
                  <input type={typeCampo2} id={idCampo2} />
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo3}>{campo3}</label>
                  <input type={typeCampo3} id={idCampo3} />
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo4}>{campo4}</label>
                  <input type={typeCampo4} id={idCampo4} />
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo5}>{campo5}</label>
                  <input type={typeCampo5} id={idCampo5} />
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo6}>{campo6}</label>
                  <input type={typeCampo6} id={idCampo6} />
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo7}>{campo7}</label>
                  <input type={typeCampo7} id={idCampo7} />
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo8}>{campo8}</label>
                  <select id={idCampo8}>
                    <option value="tipo1">Tipo 1</option>
                    <option value="tipo2">Tipo 2</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo9}>{campo9}</label>
                  <select id={idCampo9}>
                    <option value="tipo1">Departamento 1</option>
                    <option value="tipo2">Departamento 2</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo10}>{campo10}</label>
                  <input type={typeCampo10} id={idCampo10} />
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo11}>{campo11}</label>
                  <select id={idCampo11}>
                    <option value="pregunta1">Pregunta 1</option>
                    <option value="pregunta2">Pregunta 2</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor={idCampo12}>{campo12}</label>
                  <input type={typeCampo12} id={idCampo12} />
                </div>
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
