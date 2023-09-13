import React from 'react';
import "./Auditorias.css";
import Tabla from '../../components/Tabla/Tabla';

function Auditorias() {

    const columnas = [
        { field: "operacion", headerName: "Operacion", width: 300},
    
        {
          field: "usuarioau",
          headerName: "Usuario",
          width: 180,
          editable: true,
        },
        {
            field: "fecha",
            headerName: "Fecha",
            width: 160,
            editable: true,
        },
        {
            field: "hora",
            headerName: "Hora",
            width: 170,
            editable: true,
        }
    ]
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