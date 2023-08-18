// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');
const { validatePoligonos } = require('../validaciones/validations.js');

const routerPoligonos= express.Router();

routerPoligonos.use(express.json());
routerPoligonos.use(cors());



//create


//update

// Ruta para modificar un polígono por su ID
routerPoligonos.put('/:id_poligonos', validatePoligonos, async (req, res) => {
  const { id_poligonos } = req.params;
  const { nombre_poligonos, id_usuario } = req.body;

  try {
    // Actualiza el polígono en la base de datos
    const query = 'UPDATE poligonos SET nombre_poligonos = $1, id_usuario = $2 WHERE id_poligonos = $3';
    const values = [nombre_poligonos, id_usuario, id_poligonos];
    await pool.query(query, values);

    res.json({ mensaje: 'Polígono actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el polígono:', error);
    res.status(500).json({ error: error.message });
  }
});








//delete













//get all









module.exports = routerPoligonos;