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
        
      const {nombre_poligono, id_usuario} = req.body;

      // parametros para auditoria
      const  operacion  = req.method;
      const  id_usuarioAuditoria =req.headers['id_usuario'];

      const buscarIdUsuario = await pool.query("SELECT id_usuario FROM usuarios WHERE id_usuario = $1",[id_usuario]);

        if (buscarIdUsuario.rowCount === 0) {
          return res.status(404).json({ error: 'Datos incorrectos' });
        }

        const nuevoPoligono = await pool.query('INSERT INTO public."poligonos" (nombre_poligono, id_usuario) VALUES($1, $2) RETURNING id_poligono', [nombre_poligono, id_usuario]);
        const idPoligonoGenerado = nuevoPoligono.rows[0].id_poligono;
      
      auditar(operacion,id_usuarioAuditoria);

      return res.status(200).json({ mensaje: 'Poligono creado exitosamente', id_poligono: idPoligonoGenerado });
    } catch (err) {
        console.error(err.message);
    }
})

//update

routerPoligonos.put('/:id_poligono', validaIdPoligono,validaPoligono, async (req, res) => {
  const { id_poligono} = req.params;
  const { nombre_poligono } = req.body;
  
  // parametros para auditoria
  const  operacion  = req.method;
  const  id_usuarioAuditoria =req.headers['id_usuario'];

  try {

    const buscarIdPoligono = await pool.query("SELECT id_poligono FROM poligonos WHERE id_poligono = $1",[id_poligono]);

        if (buscarIdPoligono.rowCount === 0) {
          return res.status(404).json({ error: 'Error al modificar el poligono' });
        }
 
    const query = 'UPDATE poligonos SET nombre_poligono=$1 WHERE id_poligono=$2';
    const values = [nombre_poligono, id_poligono];
    
    await pool.query(query, values);

    auditar(operacion,id_usuarioAuditoria);

    res.json({ mensaje: 'Polígono modificado correctamente' }); 
  } catch (error) {
    console.error('Error al modificar el polígono:', error);
    res.status(500).json({ error: error.message });
  }
});


//get all 

routerPoligonos.get('/', async (req, res) => {
  try {
    const poligonos = await pool.query('SELECT * FROM poligonos ORDER BY id_poligono ASC');

    if (poligonos.rowCount === 0) {
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
      
      const operacion = req.method;
      const id_usuarioAuditoria = req.headers['id_usuario'];
      
      const eliminarPoligono = await pool.query('DELETE FROM poligonos WHERE id_poligono = $1', [id_poligono]);

      if (eliminarPoligono.rowCount === 0) {
          return res.status(404).json({ error: 'Datos incorrectos' });
      }

      auditar(operacion, id_usuarioAuditoria);

      res.json('Polígono eliminado');
  } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error al eliminar el polígono' });
  }
});

module.exports = routerPoligonos ;