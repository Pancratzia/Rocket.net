 // Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const routerAuditoria= express.Router();

routerAuditoria.use(express.json());
routerAuditoria.use(cors());



// create 











// get all










// get by id












// get por rango de fecha



module.exports = routerAuditoria;