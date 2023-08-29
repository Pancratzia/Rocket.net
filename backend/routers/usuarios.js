// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

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
















//  Eliminar Usuario















//Obtener Usuario






module.exports = routerUsuarios;