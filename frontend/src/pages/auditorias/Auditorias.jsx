import React from 'react';
import "./Auditorias.css";
import Tabla from '../../components/Tabla/Tabla';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Auditorias() {
  const [auditorias, setAuditorias] = useState([]);
    useEffect(() => {
        obtenerAuditorias();
    }, []);

    const obtenerAuditorias = () => {
    axios.get('http://localhost:3000/api/auditoria')
        .then((response) => {

        const auditorias = response.data.map((auditoria) => ({
            id: auditoria.id_auditoria,
            operacion: auditoria.operacion,
            usuario: "Gabriela Echeverria", // FIXME: Colocar el current user
            fecha: auditoria.fecha,
            hora: auditoria.hora
        }));

        setAuditorias(auditorias);
        })
        .catch((error) => {
        console.error('Error al obtener auditorias:', error);
        });
    };

    const columnas = [
        { field: "operacion", headerName: "Operacion", width: 300},
    
        {
          field: "usuario",
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

    return(
        <div className="contenedor-gestion">
        <div className="titulo-auditorias">
            <h1>Auditorias</h1>
            <hr/>
        </div>
        <Tabla columns={columnas} rows={auditorias}/>
        </div>
    )
}

export default Auditorias;