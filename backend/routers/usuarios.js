// Dependencias
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pool = require('../database/db.js');

const { join, extname } = require('path');

const routerUsuarios = express.Router();

routerUsuarios.use(express.json());
routerUsuarios.use(cors());

const CURRENT_DIR = __dirname;
const MIMETYPES = ['image/jpeg', 'image/jpg', 'image/png'];


const multerCarga = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, '../cargas'),
    filename: (req, file, cb) =>{
      const extArchivo = extname(file.originalname);
      const nombreArchivo = file.originalname.split(extArchivo)[0];

      cb(null, `${nombreArchivo}-${Date.now()}-${extArchivo}`);
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

routerUsuarios.post('/', multerCarga.single('fileUsuario'), async (req, res) => {

  try {

    const {
      nombre_usuario,id_sededepar,id_tipousuario,
      nombre,apellido,pregunta,respuesta,clave,
      extension_telefonica
    } = req.body;
    const fileUsuario = req.file.filename;



  //   // Insertar puntos
    await pool.query("INSERT INTO usuarios" +
    "(nombre_usuario,id_sededepar,id_tipousuario,nombre,apellido,pregunta,respuesta,clave,foto_usuario,extension_telefonica)"+ 
    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
    [
      nombre_usuario,
      id_sededepar,
      id_tipousuario,
      nombre,
      apellido,
      pregunta,
      respuesta,
      clave,
      fileUsuario,
      extension_telefonica
    ]
  );


    return res.status(200).json({ mensaje: 'Usuario creado exitosamente' });



  } catch (err) {
    console.error(err.message);
  }



});















// Modificar Usuario
















//  Eliminar Usuario















//Obtener Usuario






module.exports = routerUsuarios;