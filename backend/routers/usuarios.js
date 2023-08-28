 // Importacion de express
 const express = require('express');
 const cors = require('cors');
 const pool = require('../database/db.js');
 
 const routerUsuarios= express.Router();
 
 routerUsuarios.use(express.json());
 routerUsuarios.use(cors());



 /// Crear Usuario














 // Modificar Usuario
















//  Eliminar Usuario















//Obtener Usuario


 



module.exports = routerUsuarios;