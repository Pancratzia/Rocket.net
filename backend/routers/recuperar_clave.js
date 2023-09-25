const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js'); 
const routerRecuperarClave = express.Router();
const bcrypt = require('bcryptjs');

routerRecuperarClave.use(express.json());
routerRecuperarClave.use(cors());

// Función para encriptar una cadena con bcrypt
async function encriptarCadena(cadena) {
  try {
    const saltRounds = 10; // Número de rondas de sal
    const cadenaEncriptada = await bcrypt.hash(cadena, saltRounds);
    return cadenaEncriptada;
  } catch (error) {
    console.error('Error al encriptar la cadena:', error);
    throw error;
  }
}

// Ruta para actualizar la clave por usuario
routerRecuperarClave.put('/', async (req, res) => {
  try {
    const { usuario, nueva_clave, pregunta, respuesta } = req.body;

    if (!usuario || !nueva_clave || !pregunta || !respuesta) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Consulta para obtener la pregunta, respuesta y clave almacenada en la base de datos
    const selectQuery = 'SELECT pregunta, respuesta, clave FROM usuarios WHERE "nombre_usuario" = $1';
    const selectValues = [usuario];

    const result = await pool.query(selectQuery, selectValues);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró el usuario' });
    }

    const usuarioEncontrado = result.rows[0];
    const preguntaAlmacenada = usuarioEncontrado.pregunta;
    const respuestaAlmacenada = usuarioEncontrado.respuesta;

    // Comprobar si la pregunta proporcionada coincide con la pregunta almacenada en la base de datos
    if (pregunta !== preguntaAlmacenada) {
      return res.status(401).json({ error: 'Pregunta incorrecta' });
    }

    // Comprobar si la respuesta proporcionada por el usuario coincide con la respuesta almacenada en la base de datos sin encriptar
    if (respuesta !== respuestaAlmacenada) {
      return res.status(401).json({ error: 'Respuesta incorrecta' });
    }

    // Encripta la nueva contraseña antes de almacenarla en la base de datos
    const hashedPassword = await encriptarCadena(nueva_clave);

    // Actualiza la contraseña en la base de datos con la versión encriptada
    const updateQuery = 'UPDATE usuarios SET clave = $1 WHERE "nombre_usuario" = $2';
    const updateValues = [hashedPassword, usuario];

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

module.exports = routerRecuperarClave;
