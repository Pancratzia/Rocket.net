// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const { validateIdPoligono } = require('../validaciones/validIdPoli.js');
const {validatePoliPost} = require('../validaciones/poligonos.js');


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


//get all poligono

routerPoligonos.get('/', async (req, res) => {
  try {
    const poligonos = await pool.query('SELECT * FROM poligonos');
    res.json(poligonos.rows);
  } catch (error) {
    console.log(error);
  }
  
});

//get a poligono

routerPoligonos.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const poligono = await pool.query('SELECT * FROM poligonos WHERE id_poligonos = $1', [id]);
    res.json(poligono.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

//delete a poligono

routerPoligonos.delete('/:id', validateIdPoligono, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM poligonos WHERE id_poligonos = $1', [id]);

    if (result.rowCount === 0) {
      // No se eliminó ningún polígono, ya que no se encontró en la base de datos
      return res.status(404).json({ error: 'Polígono no encontrado' });
    }

    res.json('Polígono eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al eliminar el polígono' });
  }
});

module.exports = routerPoligonos ;