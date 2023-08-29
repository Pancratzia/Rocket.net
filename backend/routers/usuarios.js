const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const routerUsuario = express.Router();

routerUsuario.put('/:id_usuario', async (req, res) => {
    const { id_usuario } = req.params;
    const { nombre_usuario } = req.body;
    
    // parametros para auditoria
    const operacion = req.method;
    const id_usuarioAuditoria = req.headers['id_usuario'];

    try {
        

        res.json({ mensaje: 'Usuario actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});




module.exports = routerUsuario  