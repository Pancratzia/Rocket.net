const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const { validateAudit } = require('../validaciones/validAudit.js');
const {obtenerFechayHora} = require('../funciones/funciones.js');


const routerAuditoria= express.Router();

routerAuditoria.use(express.json());
routerAuditoria.use(cors());

// create 

routerAuditoria.post('/', validateAudit,  async(req, res) => { 

  try {
      const {operacion, id_usuario} = req.body;
      const fechaActual = obtenerFechayHora("fecha");
      const horaActual = obtenerFechayHora("hora");

      const newAudit = await pool.query("INSERT INTO auditoria (operacion,id_usuario,fecha,hora) VALUES (UPPER($1),$2,CAST($3 as date),CAST($4 as time))",
        [operacion,id_usuario,fechaActual,horaActual]);
      res.json(newAudit.rows[0]);
          
  } catch (err) {
      console.error(err.message);
  }
});



// get all










// get by id












// get por rango de fecha



module.exports = routerAuditoria;