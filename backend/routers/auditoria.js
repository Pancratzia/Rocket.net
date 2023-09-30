 // Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const routerAuditoria= express.Router();

routerAuditoria.use(express.json());
routerAuditoria.use(cors());

// get all
routerAuditoria.get('/', async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM auditorias order by fecha desc, hora desc")
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
});


// get by id
routerAuditoria.get('/:id_usuario', async (req, res) => {
  try {

    const {id_usuario} = req.params;
    const result = await pool.query('SELECT * FROM auditorias  WHERE id_usuario = $1', [id_usuario])
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error" });
  }
});



module.exports = routerAuditoria;