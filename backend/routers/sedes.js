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
  
  module.exports = routerSedes;
