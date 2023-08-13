// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const routerPuntos= express.Router();

routerPuntos.use(express.json());
routerPuntos.use(cors());



//create













//update












//delete












//get all












//get by id



module.exports = routerPuntos;