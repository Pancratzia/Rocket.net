// Dependencias
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const pool = require('../database/db.js');

const { validarIdUsuarios,validaActualizarUsuario } = require('../validaciones/ValidarUsuarios')

const routerUsuarios = express.Router();

routerUsuarios.use(express.json());
routerUsuarios.use(cors());

// Carga de imagenes
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

routerUsuarios.put('/:id_usuario', validarIdUsuarios, validaActualizarUsuario, async (req, res) => {
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
        foto_usuario,
        extension_telefonica,
        borrado
    } = req.body;
    
    // parametros para auditoria
    const operacion = req.method;
   // const id_usuarioAuditoria = req.headers['id_usuario'];

    try {
        // Verifica si el usuario existe en la base de datos
        const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id_usuario]);
        
        if (usuarioExistente.rowCount === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verifica si id_sededepar existe en la base de datos
        const sedeDeparExistente = await pool.query('SELECT * FROM sedes_departamentos WHERE id_sede_departamento = $1', [id_sededepar]);

        if (sedeDeparExistente.rowCount === 0) {
            return res.status(400).json({ error: 'id_sededepar no existe en la base de datos' });
        }

        // Verifica si id_tipousuario existe en la base de datos
        const tipoUsuarioExistente = await pool.query('SELECT * FROM tipos_usuarios WHERE id_tipo_usuario = $1', [id_tipousuario]);

        if (tipoUsuarioExistente.rowCount === 0) {
            return res.status(400).json({ error: 'id_tipousuario no existe en la base de datos' });
        }

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
                foto_usuario = $9,
                extension_telefonica = $10,
                borrado = $11
            WHERE id_usuario = $12
        `;
        
        const values = [
            nombre_usuario,
            id_sededepar,
            id_tipousuario,
            nombre,
            apellido,
            pregunta,
            respuesta,
            clave,
            foto_usuario,
            extension_telefonica,
            borrado,
            id_usuario
        ];

        // Ejecuta el query de actualización
        await pool.query(query, values);

        // Realiza la auditoría si es necesario
       // auditar(operacion, id_usuarioAuditoria);

        res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});













//  Eliminar Usuario















//Obtener Usuario






module.exports = routerUsuarios;