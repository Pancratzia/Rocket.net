import React from 'react';
import "./Auditorias.css";
import Tabla from '../../components/Tabla/Tabla';

function Auditorias() {

    const columnas =[]
    const filas = []

    return(
        <div className="contenedor-gestion">
        <div className="titulo-auditorias">
            <h1>Auditorias</h1>
            <hr/>
        </div>
        <Tabla columns={columnas} rows={filas}/>
        </div>
    )
}

export default Auditorias;