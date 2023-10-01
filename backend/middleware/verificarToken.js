const { jwtVerify } = require('jose');
const pool = require('../database/db.js');

const verificarJWT = async (req, res, next) => {

    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ mensaje: 'No hay token' });;

    const token = authorization.split(' ')[1];
    
    try {
        const encoder = new TextEncoder();
        const { payload } = await jwtVerify(
            token,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        );

        const query = 'SELECT * FROM usuarios WHERE id_usuario = $1';
        const user = await pool.query(query, [payload.idUser]);

        if (user.rowCount === 0) return res.sendStatus(401);

        delete user.rows[0].clave;  
        delete user.rows[0].respuesta

        req.usuario = user.rows[0]; 
        // console.log(user)
        next();
    } catch (err) {
        return res.status(401).json({ mensaje: 'No Autorizado' });
    }
};

module.exports = { verificarJWT };