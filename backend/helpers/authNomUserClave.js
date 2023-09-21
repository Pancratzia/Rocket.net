const db = require('../database/db.js'); 
const bcrypt = require('bcrypt');


const authNomUserClave = async (nombre_usuario, clave) => {
  try {
    const query = 'SELECT * FROM usuarios WHERE nombre_usuario = $1';
    const user = await db.oneOrNone(query, [nombre_usuario]);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    const contrasenaValida = await bcrypt.compare(clave, user.password);
    if (!contrasenaValida) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  } catch (error) {
  }
};

module.exports = {authNomUserClave};
