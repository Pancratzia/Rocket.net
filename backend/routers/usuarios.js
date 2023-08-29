const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');
const bcrypt = require('bcrypt');

const { validarIdUsuarios,validaActualizarUsuario } = require('../validaciones/ValidarUsuarios')

const routerUsuarios = express.Router();

routerUsuarios.use(express.json());
routerUsuarios.use(cors());



/// Crear Usuario

routerUsuarios.post('/', async (req, res) => {

  try {

    const {nombre_usuario,sede_departamento,tipo_usuario,nombre,apellido,pregunta,respuesta,clave,foto_usuario,extension_telefonica} = req.body;

    

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

        // Encriptar la clave
        const claveEncriptada = await bcrypt.hash(clave, 10);

        // Encriptar la respuesta
        const respuestaEncriptada = await bcrypt.hash(respuesta, 10);
        

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
            respuestaEncriptada,
            claveEncriptada,
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