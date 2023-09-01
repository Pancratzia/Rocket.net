// Dependencias
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pool = require('../database/db.js');
const bcrypt = require('bcrypt');

const crypto = require('crypto');


const { validarIdUsuarios, validarActUsuario, validarUsuario } = require('../validaciones/ValidarUsuarios.js')
const { auditar,convertirMayusculas } = require('../funciones/funciones.js')
const { join, extname } = require('path');

const routerUsuarios = express.Router();
routerUsuarios.use(express.json());
routerUsuarios.use(cors());

// Carga de imagenes
const CURRENT_DIR = __dirname;
const MIMETYPES = ['image/jpeg', 'image/jpg', 'image/png'];


const multerCarga = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, '../cargas'),
    filename: (req, file, cb) => {
      const extArchivo = extname(file.originalname);
      const nombreArchivo = file.originalname.split(extArchivo)[0]
        .split(extArchivo)[0]
        .replace(/\s+/g, '_')
        .toLowerCase();

      cb(null, `${nombreArchivo}-${extArchivo}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (MIMETYPES.includes(file.mimetype)) cb(null, true)
    else cb(new Error(`Solo estos tipos de MIMYTIPES ${MIMETYPES.join('')} son permitidos`))
  },
  limits: {
    fieldSize: 10000000
  }
});

/// Crear Usuario

routerUsuarios.post('/', multerCarga.single('fileUsuario'), validarUsuario, async (req, res) => {

  const consulta = `
  INSERT INTO usuarios (
    nombre_usuario, id_sededepar, id_tipousuario, nombre, apellido, pregunta, respuesta, clave, foto_usuario, extension_telefonica
  )
  SELECT
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
  WHERE EXISTS (SELECT 1 FROM sedes_departamentos WHERE id_sede_departamento = $2)
    AND EXISTS (SELECT 1 FROM tipos_usuarios WHERE id_tipo_usuario = $3)
  RETURNING *; `;

  try {
    const { nombre_usuario, id_sededepar, id_tipousuario,nombre, apellido, pregunta, respuesta, clave, extension_telefonica} = req.body;
    const operacion = req.method;

    const id_usuarioAuditoria = req.headers['id_usuario'];
    const imagenUsuario = req.file.filename;

    const camposAmayusculas = ['nombre', 'apellido', 'pregunta'];
    const camposMayus = convertirMayusculas(camposAmayusculas, req.body);

    const fraseEncriptacion = crypto.randomBytes(64).toString('base64');
    const claveSegura = await bcrypt.hash(clave + fraseEncriptacion, 12);
    const respuestaSegura = await bcrypt.hash(respuesta + fraseEncriptacion, 12);

    const crearUsuario = await pool.query(consulta, [
      nombre_usuario, id_sededepar, id_tipousuario, camposMayus.nombre, camposMayus.apellido,
      camposMayus.pregunta, respuestaSegura, claveSegura, imagenUsuario, extension_telefonica
    ]);

    if (crearUsuario.rows.length === 0) {
      return res.status(400).json({ error: 'Error al crear el usuario' });
    }

    auditar(operacion, id_usuarioAuditoria);

    return res.status(200).json({ mensaje: 'Usuario creado exitosamente' });

  } catch (error) {
    console.error(error.message);
  }
});



// Modificar Usuario

routerUsuarios.put('/:id_usuario', validarIdUsuarios, validarActUsuario, multerCarga.single('fileUsuario'), async (req, res) => {
  const { id_usuario } = req.params;
  const {
    nombre_usuario,
    id_sededepar,
    id_tipousuario,
    nombre,
    apellido,
    pregunta,
    respuesta,
    clave,
    extension_telefonica
  } = req.body;

  // Obtén el nombre del archivo cargado
  const fileUsuario = req.file ? req.file.filename : null;

  // Convierte a mayúsculas los campos que deben ser en mayúsculas
  const nombreEnMayusculas = nombre.toUpperCase();
  const apellidoEnMayusculas = apellido.toUpperCase();
  const preguntaEnMayusculas = pregunta.toUpperCase();


  // parametros para auditoria
  const operacion = req.method;
  const id_usuarioAuditoria = req.headers['id_usuario'];

  try {

    // Crear frase de encriptación
    const fraseEncriptacion = crypto.randomBytes(64).toString('base64');
    
    // Encriptar la clave
    const claveEncriptada = await bcrypt.hash(clave + fraseEncriptacion, 12);

    // Encriptar la respuesta
    const respuestaEncriptada = await bcrypt.hash(respuesta + fraseEncriptacion, 12);


    // Define el query SQL para actualizar el usuario
    const query = `
       UPDATE usuarios 
      SET 
        nombre_usuario = $1,
        id_sededepar = $2,
        id_tipousuario = $3,
        nombre = $4,
        apellido = $5,
        pregunta = $6,
        respuesta = $7,
        clave = $8,
        foto_usuario = COALESCE($9, foto_usuario),
        extension_telefonica = $10
      WHERE id_usuario = $11
        AND NOT borrado
        AND EXISTS (SELECT 1 FROM sedes_departamentos WHERE id_sede_departamento = $2)
        AND EXISTS (SELECT 1 FROM tipos_usuarios WHERE id_tipo_usuario = $3)
      RETURNING *;
    `;

    const values = [
      nombre_usuario,
      id_sededepar,
      id_tipousuario,
      nombreEnMayusculas,
      apellidoEnMayusculas,
      preguntaEnMayusculas,
      respuestaEncriptada,
      claveEncriptada,
      fileUsuario,
      extension_telefonica,
      id_usuario

    ];

    // Ejecuta el query de actualización
    const actualizarUsuario = await pool.query(query, values);

    if (actualizarUsuario.rowCount === 0) {
      return res.status(400).json({ error: 'No se pudo actualizar el usuario.' });
    }

    // Realiza la auditoría si es necesario
    auditar(operacion, id_usuarioAuditoria);

    res.json({ mensaje: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: error.message });
  }
});


// Eliminar Usuario
routerUsuarios.put('/borrar-usuario/:id_usuario', validarIdUsuarios, async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const operacion = req.method;
    const id_usuarioAuditoria = req.headers['id_usuario'];

    const query = `
      UPDATE usuarios 
      SET borrado = true
      WHERE id_usuario = $1
    `;

    const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);

    if (usuarioExistente.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await pool.query(query, [id_usuario]);

    auditar(operacion, id_usuarioAuditoria);

    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al marcar usuario como borrado:', error);
    res.status(500).json({ error: 'Error al marcar usuario como borrado' });
  }
});



//Obtener Usuario

 routerUsuarios.get('/', async (req, res) => {
  try {
      const usuarios = await pool.query('SELECT * FROM usuarios ORDER BY id_usuario ASC');
      res.json(usuarios.rows);

  } catch (error) {
    console.log(error);
  }
});


module.exports = routerUsuarios