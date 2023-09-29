const express = require('express');

const { SignJWT } = require('jose');
const bcrypt = require("bcryptjs");

const cors = require('cors');
const pool = require('../database/db.js');

const routerLogin = express.Router();
routerLogin.use(express.json());
routerLogin.use(cors());

routerLogin.post('/', async (req, res) => {
    try {

        const { nombre_usuario, clave } = req.body;

        const query = 'SELECT * FROM usuarios WHERE nombre_usuario = $1 AND borrado = false';
        const result = await pool.query(query, [nombre_usuario]);

        if (result.rowCount === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const user = result.rows[0];
        const contrasenaValida = await bcrypt.compare(clave + user.frase_encriptada, user.clave);

        if (!contrasenaValida) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const idUser = user.id_usuario;

        const jwtConstructor = new SignJWT({ idUser });
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        res.status(200).json({ mensaje: 'Inicio de Sesión exitoso', jwt });

    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
})

module.exports = routerLogin  
