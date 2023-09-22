const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js'); 
const routerContrasena2 = express.Router();

routerContrasena2.use(express.json());
routerContrasena2.use(cors());

// Ruta para actualizar la clave por usuario
routerContrasena2.put('/', async (req, res) => {
  try {
    const { usuario, nueva_clave } = req.body;

    if (!usuario || !nueva_clave) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Realiza la actualización en la base de datos
    const updateQuery = 'UPDATE usuarios SET clave = $1 WHERE "nombre_usuario" = $2';
    const updateValues = [nueva_clave, usuario];

    const result = await pool.query(updateQuery, updateValues);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'No se encontró el usuario' });
    }

    res.json({ mensaje: 'Clave actualizada correctamente' });
  }  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
});


module.exports = routerContrasena2;