// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const routerPoligonos= express.Router();

routerPoligonos.use(express.json());
routerPoligonos.use(cors());



//create













//update












//delete













//get all









module.exports = routerPoligonos;