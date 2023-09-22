const express = require('express');
const cors = require('cors');
const crypto = require('crypto'); // Para generar tokens seguros de recuperación
const pool = require('../database/db.js');


const routerContrasena = express.Router();
routerContrasena.use(express.json());
routerContrasena.use(cors());

routerContrasena.post('/forgot-password', async (req, res) => {
    try {
      const { email } = req.body;
  
      // Verificar si el correo electrónico existe en la base de datos
      const user = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [email]);
  
      if (user.rowCount === 0) {
        return res.status(404).json({ error: 'El correo electrónico no está registrado' });
      }
  
      // Generar un token de recuperación de contraseña
      const token = crypto.randomBytes(20).toString('hex');
  
      // Guardar el token en la base de datos junto con la fecha de expiración
      const now = new Date();
      now.setHours(now.getHours() + 1); // Token válido por 1 hora
      await pool.query('INSERT INTO password_reset_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)', [token, user.rows[0].id_usuario, now]);
  
      // Enviar correo electrónico con el token de recuperación
      const transporter = nodemailer.createTransport({
        // Configura las opciones de transporte de correo
      });
  
      const mailOptions = {
        from: 'tucorreoelectronico@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        text: `Utiliza este enlace para recuperar tu contraseña: http://tuweb.com/reset-password?token=${token}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      return res.status(200).json({ mensaje: 'Correo de recuperación enviado con éxito' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Error al enviar el correo de recuperación' });
    }
  });
  
  module.exports = routerContrasena;

  //Version de prueba