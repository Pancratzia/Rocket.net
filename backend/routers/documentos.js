// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const routerDocumentos = express.Router();
routerDocumentos.use(express.json());
routerDocumentos.use(cors());
const { validarIdDocumento, validarDocumento } = require('../validaciones/ValidarDocumentos.js')

//Crear Documento

const { CargaDocumento, CURRENT_DIR } = require('../middleware/DocumentosMulter.js')

routerDocumentos.post('/', validarDocumento, CargaDocumento.single('documento'),async (req, res) => {
  const { titulo,descripcion, id_usuario, hora_subida, fecha_subida } = req.body;
  const documento = req.file.filename;

  const query = 'INSERT INTO documentos (titulo, descripcion, id_usuario, hora_subida, fecha_subida) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [titulo, descripcion, id_usuario, hora_subida, fecha_subida];

  try {
    const result = await pool.query(query, values);
    console.log(result)
    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir el archivo' });
  } 
});

//Modificar Documentos

routerDocumentos.put('/:id_documento', validarDocumento, validarIdDocumento, async (req, res) => {
  try {
    const { id_documento } = req.params;
    const { titulo, descripcion, id_usuario, hora_subida,fecha_subida} = req.body;
    console.log(req.body)

    // Validaciones para validar existencia del documento
    const buscarIdDocumento = await pool.query("SELECT id_documento FROM documentos WHERE id_documento = $1", [id_documento]);

    if (buscarIdDocumento.rowCount === 0) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }

    // Validaciones para validar existencia del usuario
    const buscarIdUsuario = await pool.query("SELECT id_usuario FROM usuarios WHERE id_usuario = $1", [id_usuario]);

    if (buscarIdUsuario.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const modificarDocumento = await pool.query('UPDATE "documentos" SET titulo = $1, descripcion = $2, id_usuario = $3, hora_subida = $4, fecha_subida = $5 WHERE id_documento = $6', [titulo, descripcion, id_usuario, hora_subida,fecha_subida, id_documento]);

    res.status(200).json({ mensaje: 'Documento modificado exitosamente' });
  } catch (err) {
    console.error(err.message)
  }
})

//Obtener Documentos

routerDocumentos.get('/', async (req, res) => {
  try {
    const documentos = await pool.query('SELECT id_documento, titulo, descripcion, id_usuario, hora_subida, fecha_subida FROM documentos WHERE (borrado = false OR borrado IS NULL) ORDER BY id_documento ASC');
    res.json(documentos.rows);

  } catch (error) {
    console.log(error);
  }
});
  
  //Obtener un Documento
  
routerDocumentos.get('/:id_documento', validarIdDocumento, validarDocumento, async (req, res) => {
  try {
    const { id_documento } = req.params;
    const documentos = await pool.query('SELECT id_documento, titulo, descripcion, id_usuario, hora_subida, fecha_subida FROM documentos WHERE (id_documento = $1) AND (borrado = false OR borrado IS NULL)', [id_documento]);
    console.log(id_documento)
    if (documentos.rowCount === 0) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }
    res.json(documentos.rows[0]);

  } catch (error) {
    console.log(error);
  }
});


  // Eliminar Documento
routerDocumentos.delete('/:id_documento', validarIdDocumento, validarDocumento, async (req, res) => {
  try {
    const { id_documento } = req.params;
    const EliminarDocumento = await pool.query('DELETE FROM documentos WHERE id_documento = $1', [id_documento]);

    if (EliminarDocumento.rowCount === 0) {
      return res.status(404).json({ error: 'Documento no encontrado' });
    }
    res.json('El documento fue borrado');
  } catch (err) {
    console.error(err.message)
  }
});


module.exports = routerDocumentos ;
