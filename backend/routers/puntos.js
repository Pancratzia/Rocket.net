// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');

const { validaPuntos, validaidPuntos } = require('../validaciones/ValidarPuntos.js');
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

        // Validaciones para validar existencia del poligono
        const buscarIdPoligono = await pool.query("SELECT id_poligono FROM poligonos WHERE id_poligono = $1",[id_poligono]);

        if (buscarIdPoligono.rowCount === 0) {
          return res.status(404).json({ error: 'Polígono no encontrado' });
        }

        //Validaciones para validar que un punto no tenga la misma latitud y longitud 
        const existenciasPuntos = await pool.query("SELECT id_punto FROM puntos WHERE id_poligono = $1 AND latitud = $2 AND longitud = $3",
        [id_poligono, latitud, longitud]);

        if (existenciasPuntos.rows.length > 0) {
        return res.status(400).send({error: "Ya existe este punto en el polígono"});
        }

        // Insertar puntos
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
      
      const modificarPunto = await pool.query('UPDATE "puntos" SET id_poligono = $1, latitud = $2, longitud = $3 WHERE id_punto = $4', [id_poligono, latitud, longitud, id_punto]);
  
      auditar(operacion,id_usuarioAuditoria);

      res.status(200).json({mensaje:'Punto modificado exitosamente'});
    } catch (err) {
      console.error(err.message)
    }
  })


//delete
routerPuntos.delete('/:id_punto', validaidPuntos, async(req, res )=> {
  try {
    const {id_punto} = req.params;
    const  operacion  = req.method;
    const  id_usuarioAuditoria  =req.headers['id_usuario'];

    const borrarPunto = await pool.query('DELETE FROM "puntos" WHERE id_punto = $1', [id_punto]);

    auditar(operacion,id_usuarioAuditoria);

    if (borrarPunto.rowCount === 0) {
      // No se eliminó ningún polígono, ya que no se encontró en la base de datos
      return res.status(404).json({ error: 'Punto no encontrado' });
    }
    res.status(200).json({mensaje:'El punto borrado exitosamente'});
  } catch (err) {
    console.error(err.message)
  }
})

//get all puntos and order them from first to last

routerPuntos.get('/', async (req, res) => {
  try {
      const puntos = await pool.query('SELECT * FROM puntos ORDER BY id_punto ASC');
      res.json(puntos.rows);
  } catch (error) {
      console.log(error);
  }
})




module.exports = routerPuntos;