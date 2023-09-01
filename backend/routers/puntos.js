// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const { validaPuntos, validaidPuntos } = require('../validaciones/ValidarPuntos.js');
const { auditar } = require('../funciones/funciones.js')

const routerPuntos = express.Router();
routerPuntos.use(express.json());
routerPuntos.use(cors());

//create
routerPuntos.post('/', validaPuntos, async (req, res) => {
  try {
    const { id_poligono, latitud, longitud } = req.body;

    const queryCrearPunto = `
      INSERT INTO puntos (id_poligono, latitud, longitud)
      SELECT $1, $2, $3
      WHERE NOT EXISTS (
        SELECT 1 FROM puntos WHERE id_poligono = $1 AND latitud = $2 AND longitud = $3
      )
      RETURNING *;
    `;

    const result = await pool.query(queryCrearPunto, [id_poligono, latitud, longitud]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'El punto ya existe en el polígono' });
    }

    res.status(200).json({ mensaje: 'Punto creado exitosamente', punto: result.rows[0] });
  } catch (error) {
    console.error(error.message);
  }
});



//update
routerPuntos.put('/:id_punto', async (req, res) => {
    try {
        const { id_punto } = req.params;
        const { id_poligono, latitud, longitud } = req.body;
        const operacion = req.method;
        const id_usuarioAuditoria = req.headers['id_usuario'];

        const query = `
            UPDATE puntos
            SET id_poligono = $1, latitud = $2, longitud = $3
            WHERE id_punto = $4
            AND EXISTS (SELECT 1 FROM poligonos WHERE id_poligono = $1)
            RETURNING *;
        `;

        const result = await pool.query(query, [id_poligono, latitud, longitud, id_punto]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Punto no encontrado o Polígono no existe' });
        }

        auditar(operacion, id_usuarioAuditoria);

        res.status(200).json({ mensaje: 'Punto modificado exitosamente' });
    } catch (err) {
        console.error(err.message);
    }
});


//delete
routerPuntos.delete('/:id_punto', validaidPuntos, async (req, res) => {
  try {
    const { id_punto } = req.params;
    const operacion = req.method;
    const id_usuarioAuditoria = req.headers['id_usuario'];

    const borrarPunto = await pool.query('DELETE FROM "puntos" WHERE id_punto = $1', [id_punto]);

    auditar(operacion, id_usuarioAuditoria);

    if (borrarPunto.rowCount === 0) {
      // No se eliminó ningún polígono, ya que no se encontró en la base de datos
      return res.status(404).json({ error: 'Punto no encontrado' });
    }
    res.json('El punto fue borrado');
  } catch (err) {
    console.error(err.message)
  }
})

//get all puntos and order them from first to last

routerPuntos.get('/', async (req, res) => {
  try {
    const puntos = await pool.query('SELECT * FROM puntos ORDER BY id_punto ASC');
    res.json(puntos.rows);
  } catch (error) {
    console.log(error);
  }
})




module.exports = routerPuntos;