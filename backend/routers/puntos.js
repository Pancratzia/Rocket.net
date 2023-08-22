// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const { validaPuntos } = require('../validaciones/ValidarPuntos.js');
const {auditar} = require('../funciones/funciones.js')

const routerPuntos= express.Router();
routerPuntos.use(express.json());
routerPuntos.use(cors());

//create
routerPuntos.post('/',validaPuntos, async(req,res)=>{
    try {
        const {id_poligono,latitud,longitud} = req.body;
        const  operacion  = req.method;
        const  id_usuarioAuditoria  =req.headers['id_usuario'];

        const buscarIdPoligono = await pool.query("SELECT id_poligono FROM poligonos WHERE id_poligono = $1",[id_poligono]);

        if (buscarIdPoligono.rowCount === 0) {
          // No se eliminó ningún polígono, ya que no se encontró en la base de datos
          return res.status(404).json({ error: 'Polígono no encontrado' });
        }

        await pool.query("INSERT INTO puntos (id_poligono,latitud,longitud) VALUES($1,$2,$3) RETURNING *",
            [id_poligono, latitud, longitud]);

            auditar(operacion,id_usuarioAuditoria);
        
            return res.status(200).json({ mensaje: 'Punto creado exitosamente' });
    } catch (err) {
        console.error(err.message);
    }
});

//update
routerPuntos.put('/:id_punto',validaPuntos, async (req, res) => {
    try {
      const {id_punto} = req.params;
      const {id_poligono, latitud, longitud} = req.body;

      const  operacion  = req.method;
      const  id_usuarioAuditoria  =req.headers['id_usuario'];
      
      const updateRocket = await pool.query('UPDATE "puntos" SET id_poligono = $1, latitud = $2, longitud = $3 WHERE id_punto = $4', [id_poligono, latitud, longitud, id_punto]);
  
      auditar(operacion,id_usuarioAuditoria);

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
    const  id_usuarioAuditoria  =req.headers['id_usuario'];

    const deleteRocket = await pool.query('DELETE FROM "puntos" WHERE id_punto = $1', [id]);

    auditar(operacion,id_usuarioAuditoria);

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