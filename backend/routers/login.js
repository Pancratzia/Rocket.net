const express = require('express');
const {jwt} = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const pool = require('../database/db.js');

const routerLogin = express.Router();
routerLogin.use(express.json());
routerLogin.use(cors());

routerLogin.post('/', async(req, res) => {

    const {nombre_usuario, clave} = req.body;

});

function generateAccessToken(user){

};



module.exports =routerLogin  