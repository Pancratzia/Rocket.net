// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');
const routerSedes= express.Router();

routerSedes.use(express.json());
routerSedes.use(cors());

// get all
routerSedes.get('/', async (req, res) => {
    try {
      const result = await pool.query("SELECT nombre_sede,latitud,longitud,ip FROM sedes order by nombre_sede")
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ message: "Ha ocurrido un error" });
    }
  });

  //get a sede

routerSedes.get('/:id_sede', async (req, res) => {
  try {
    const { id_sede } = req.params;
    const sedes = await pool.query('SELECT nombre_sede,latitud,longitud,ip FROM sedes WHERE id_sede = $1', [id_sede]);

    if (sedes.rowCount === 0) {
      return res.status(404).json({ error: 'La sede no fue encontrada' });
    }
    res.json(sedes.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

  
  module.exports = routerSedes;
