// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const { validaPoligono, validaIdPoligono} = require('../validaciones/ValidarPoligonos.js');
const {auditar} = require('../funciones/funciones.js')


const routerPoligonos= express.Router();

routerPoligonos.use(express.json());
routerPoligonos.use(cors());



//create
routerPoligonos.post('/', validaPoligono, async(req, res) => {
    try {
        
      const {nombre_poligono} = req.body;
      const {id_usuario} = req.body;

      // parametros para auditoria
      const  operacion  = req.method;
      const  id_usuarioAuditoria =req.headers['id_usuario'];

      const newRocket= await pool.query('INSERT INTO public. "poligonos" (nombre_poligono, id_usuario) VALUES($1, $2) RETURNING *', [nombre_poligono, id_usuario]);

      auditar(operacion,id_usuarioAuditoria);

      res.send(JSON.stringify(newRocket.rows[0]));
    } catch (err) {
        console.error(err.message);
    }
})

//update

// Ruta para modificar un polígono por su ID
routerPoligonos.put('/:id_poligono', validaIdPoligono, async (req, res) => {
  const { id_poligono} = req.params;
  const { nombre_poligono, id_usuario } = req.body;
  
  // parametros para auditoria
  const  operacion  = req.method;
  const  id_usuarioAuditoria =req.headers['id_usuario'];

  try {
    // Actualiza el polígono en la base de datos
    const query = 'UPDATE poligonos SET nombre_poligono = $1, id_usuario = $2 WHERE id_poligono = $3';
    const values = [nombre_poligono, id_usuario, id_poligono];
    
    await pool.query(query, values);

    auditar(operacion,id_usuarioAuditoria);

    res.json({ mensaje: 'Polígono actualizado correctamente' }); //  JSON.stringify(updatePoligono.rows[0])
  } catch (error) {
    console.error('Error al actualizar el polígono:', error);
    res.status(500).json({ error: error.message });
  }
});


//get all and order them from first to last

routerPoligonos.get('/', async (req, res) => {
  try {
    const poligonos = await pool.query('SELECT * FROM poligonos ORDER BY id_poligono ASC');

    if (poligonos.rowCount === 0) {
      // No se eliminó ningún polígono, ya que no se encontró en la base de datos
      return res.status(404).json({ error: 'No hay poligonos registrados' });
    }
    res.json(poligonos.rows);
  } catch (error) {
    console.log(error);
  }
  
});

//get a poligono

routerPoligonos.get('/:id_poligono', validaIdPoligono, async (req, res) => {
  try {
    const { id_poligono } = req.params;
    const poligono = await pool.query('SELECT * FROM poligonos WHERE id_poligono = $1', [id_poligono]);

    if (poligono.rowCount === 0) {
      // No se eliminó ningún polígono, ya que no se encontró en la base de datos
      return res.status(404).json({ error: 'Polígono no encontrado' });
    }
    res.json(poligono.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

//delete a poligono, 

routerPoligonos.delete('/:id_poligono', validaIdPoligono, async (req, res) => {
  try {
      const { id_poligono } = req.params;
      
      //if the polygon id route parameter is empty "" throw error message
      if (!id_poligono) {
          return res.status(400).json({ error: 'El campo id_poligono es requerido' });
      }
      
      const operacion = req.method;
      const id_usuarioAuditoria = req.headers['id_usuario'];
      
      const eliminarPoligono = await pool.query('DELETE FROM poligonos WHERE id_poligono = $1', [id_poligono]);

      if (eliminarPoligono.rowCount === 0) {
          return res.status(404).json({ error: 'Polígono no encontrado' });
      }

      auditar(operacion, id_usuarioAuditoria);

      res.json('Polígono eliminado');
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al eliminar el polígono' });
  }
});

module.exports = routerPoligonos ;