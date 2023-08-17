// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const routerPoligonos= express.Router();

routerPoligonos.use(express.json());
routerPoligonos.use(cors());



//create
routerPoligonos.post('/', async(req, res) => {
    try {
        
      const {nombre_zona} = req.body;
      const {id_usuario} = req.body;
      const newRocket= await pool.query('INSERT INTO public. "Zona" (nombre_zona, id_usuario) VALUES($1, $2) RETURNING *', [nombre_zona, id_usuario]);

      res.send(JSON.stringify(newRocket.rows[0]));
    } catch (err) {
        console.error(err.message);
    }
})












//update












//delete













//get all





module.exports = routerPoligonos;