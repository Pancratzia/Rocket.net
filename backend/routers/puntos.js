// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');
const {validatePuntPut} = require('../validaciones/validations.js');
const {validatePuntD} = require('../validaciones/validations.js');

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
routerPuntos.put('/:id', async (req, res) => {
    try {
      const {id} = req.params;
      const {id_zona, latitud, longitud} = req.body;
      const  operacion  = req.method;
      const  id_usuario  =req.headers['id_usuario'];
      
      const updateRocket = await pool.query('UPDATE "puntos" SET id_zona = $1, latitud = $2, longitud = $3 WHERE id_punto = $4', [id_zona, latitud, longitud, id]);
  
      auditar(operacion,id_usuario);

      res.json('¡Todo fue actualizado!');
    } catch (err) {
      console.error(err.message)
    }
  })


//delete
routerPuntos.delete('/:id', async(req, res )=> {
  try {
    const {id} = req.params;
    const  operacion  = req.method;
    const  id_usuario  =req.headers['id_usuario'];

    const deleteRocket = await pool.query('DELETE FROM "puntos" WHERE id_punto = $1', [id]);

    auditar(operacion,id_usuario);

    res.json('El punto fue borrado');
  } catch (err) {
    console.error(err.message)
  }
})

//get all puntos

routerPuntos.get('/', async (req, res) => {
  try {
      const puntos = await pool.query('SELECT * FROM puntos');
      res.json(puntos.rows);
  } catch (error) {
      console.log(error);
  }
})




module.exports = routerPuntos;