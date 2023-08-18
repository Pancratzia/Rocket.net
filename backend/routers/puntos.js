// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const { validatePuntos } = require('../validaciones/validPoints.js');
const {auditar} = require('../funciones/funciones.js')

const routerPuntos= express.Router();
routerPuntos.use(express.json());
routerPuntos.use(cors());

//create
routerPuntos.post('/',validatePuntos, async(req,res)=>{
    try {
        const {id_zona,latitud,longitud} = req.body;
        const  operacion  = req.method;
        const  id_usuario  =req.headers['id_usuario'];

        const newPuntos = await pool.query("INSERT INTO puntos (id_zona,latitud,longitud) VALUES($1,$2,$3)",
            [id_zona, latitud, longitud]);

            auditar(operacion,id_usuario);
        
        res.json(newPuntos.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});










//update












//delete












//get all












module.exports = routerPuntos;