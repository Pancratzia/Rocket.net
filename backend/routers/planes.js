const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');
const routerPlanes = express.Router();

routerPlanes.use(express.json());
routerPlanes.use(cors());

module.exports = routerPlanes;