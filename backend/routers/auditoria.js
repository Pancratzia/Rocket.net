
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const routerAuditoria= express.Router();

routerAuditoria.use(express.json());
routerAuditoria.use(cors());


// get all











module.exports = routerAuditoria;