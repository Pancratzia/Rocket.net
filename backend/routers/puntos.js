// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');
const {validatePuntPut} = require('../validaciones/validations.js');
const {validatePuntD} = require('../validaciones/validations.js');

const routerPuntos= express.Router();

routerPuntos.use(express.json());
routerPuntos.use(cors());



//create













//update
routerPuntos.put('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const {id_zona, latitud, longitud} = req.body;
      
      const updateRocket = await pool.query('UPDATE "Puntos" SET id_zona = $1, latitud = $2, longitud = $3 WHERE id_punto = $4', [id_zona, latitud, longitud, id]);
  
      res.json('¡Todo fue actualizado!');
    } catch (err) {
      console.error(err.message)
    }
  })











//delete
routerPuntos.delete('/:id', async(req, res )=> {
  try {
    const {id} = req.params;
    const deleteRocket = await pool.query('DELETE FROM "Puntos" WHERE id_punto = $1', [id]);

    res.json('El punto fue borrado');
  } catch (err) {
    console.error(err.message)
  }
})











//get all












module.exports = routerPuntos;