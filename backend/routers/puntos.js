// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const { validatePuntos } = require('../validaciones/ValidaPuntos.js');
const {auditar} = require('../funciones/funciones.js')

const routerPuntos= express.Router();
routerPuntos.use(express.json());
routerPuntos.use(cors());

//create
routerPuntos.post('/',validatePuntos, async(req,res)=>{
    try {
        const {id_poligono,latitud,longitud} = req.body;
        const  operacion  = req.method;
        const  id_usuario  =req.headers['id_usuario'];

        const newPuntos = await pool.query("INSERT INTO puntos (id_poligono,latitud,longitud) VALUES($1,$2,$3) RETURNING *",
            [id_poligono, latitud, longitud]);

            auditar(operacion,id_usuario);
        
            res.send(JSON.stringify(newPuntos.rows[0]));
    } catch (err) {
        console.error(err.message);
    }
});

//update
routerPuntos.put('/:id_punto',validatePuntos, async (req, res) => {
    try {
      const {id_punto} = req.params;
      const {id_poligono, latitud, longitud} = req.body;

      const  operacion  = req.method;
      const  id_usuario  =req.headers['id_usuario'];
      
      const updateRocket = await pool.query('UPDATE "puntos" SET id_poligono = $1, latitud = $2, longitud = $3 WHERE id_punto = $4', [id_poligono, latitud, longitud, id_punto]);
  
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