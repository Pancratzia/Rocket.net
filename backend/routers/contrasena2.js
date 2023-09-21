const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js'); // Asegúrate de tener tu configuración de base de datos correctamente importada
const routerContrasena2 = express.Router();

routerContrasena2.use(express.json());
routerContrasena2.use(cors());

// Ruta para actualizar la clave por correo electrónico
routerContrasena2.put('/', async (req, res) => {
  try {
    const { correo, nueva_clave } = req.body;

    if (!correo || !nueva_clave) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Realiza la actualización en la base de datos
    const updateQuery = 'UPDATE usuarios SET clave = $1 WHERE "correo" = $2';
    const updateValues = [nueva_clave, correo];

    const result = await pool.query(updateQuery, updateValues);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'No se encontró ningún usuario con ese correo electrónico' });
    }

    res.json({ mensaje: 'Clave actualizada correctamente' });
  }  catch (error) {
    console.error(error); // Agrega esta línea para imprimir el error en la consola
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
});


module.exports = routerContrasena2;