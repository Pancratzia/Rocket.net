const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js'); 
const routerContrasena2 = express.Router();

routerContrasena2.use(express.json());
routerContrasena2.use(cors());

// Ruta para actualizar la clave por usuario
routerContrasena2.put('/', async (req, res) => {
  let usuarioEncontrado; // Declarar la variable fuera del bloque try
  try {
    const { usuario, nueva_clave, respuesta } = req.body;

    if (!usuario || !nueva_clave || !respuesta) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Consulta para obtener la pregunta y respuesta almacenada en la base de datos
    const selectQuery = 'SELECT pregunta, respuesta FROM usuarios WHERE "nombre_usuario" = $1';
    const selectValues = [usuario];

    const result = await pool.query(selectQuery, selectValues);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró el usuario' });
    }

    usuarioEncontrado = result.rows[0]; // Asignar el valor a la variable
    const preguntaAlmacenada = usuarioEncontrado.pregunta;
    const respuestaAlmacenada = usuarioEncontrado.respuesta;

    // Comprobar si la respuesta proporcionada coincide con la respuesta almacenada
    if (respuesta !== respuestaAlmacenada) {
      return res.status(401).json({ error: 'Respuesta incorrecta' });
    }

    // Realiza la actualización en la base de datos
    const updateQuery = 'UPDATE usuarios SET clave = $1 WHERE "nombre_usuario" = $2';
    const updateValues = [nueva_clave, usuario];

    const updateResult = await pool.query(updateQuery, updateValues);

    if (updateResult.rowCount === 0) {
      return res.status(404).json({ error: 'No se encontró el usuario' });
    }

    res.json({ mensaje: 'Clave actualizada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
});

module.exports = routerContrasena2;

