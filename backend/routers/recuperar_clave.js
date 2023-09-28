const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js'); 
const routerRecuperarClave = express.Router();
const bcrypt = require('bcryptjs');

routerRecuperarClave.use(express.json());
routerRecuperarClave.use(cors());

routerRecuperarClave.put('/', async (req, res) => {

  try {
    const { usuario, nueva_clave, respuesta } = req.body;

    const selectQuery = 'SELECT respuesta, clave, frase_encriptada FROM usuarios WHERE "nombre_usuario" = $1';
    const selectValues = [usuario];
    const result = await pool.query(selectQuery, selectValues);


    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No se encontró el usuario' });
    }

    const user = result.rows[0];
    const frase_encriptada = user.frase_encriptada;

    const cadenaEncriptada = await bcrypt.hash(nueva_clave + frase_encriptada, 12);


    const respuestaValida = await bcrypt.compare(respuesta + frase_encriptada, user.respuesta);
    if (!respuestaValida) {
      return res.status(401).json({ error: 'Respuesta incorrecta' });
    }

    const updateQuery = 'UPDATE usuarios SET clave = $1 WHERE "nombre_usuario" = $2';
    const updateValues = [cadenaEncriptada, usuario];
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