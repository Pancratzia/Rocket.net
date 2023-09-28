const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js'); 
const routerRecuperarClave = express.Router();
const bcrypt = require('bcryptjs');

routerRecuperarClave.use(express.json());
routerRecuperarClave.use(cors());

async function encriptarCadena(cadena) {
  try {
    const saltRounds = 10;
    const cadenaEncriptada = await bcrypt.hash(cadena, saltRounds);
    return cadenaEncriptada;
  } catch (error) {
    console.error('Error al encriptar la cadena:', error);
    throw error;
  }
}

routerRecuperarClave.put('/', async (req, res) => {
  try {
    const { usuario, nueva_clave, respuesta } = req.body;

    if (!usuario || !nueva_clave || !respuesta) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const selectQuery = 'SELECT respuesta, clave FROM usuarios WHERE "nombre_usuario" = $1';
    const selectValues = [usuario];

    const result = await pool.query(selectQuery, selectValues);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró el usuario' });
    }

    const usuarioEncontrado = result.rows[0];
    const respuestaAlmacenada = usuarioEncontrado.respuesta;

    if (respuesta !== respuestaAlmacenada) {
      return res.status(401).json({ error: 'Respuesta incorrecta' });
    }

    const hashedPassword = await encriptarCadena(nueva_clave);

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
