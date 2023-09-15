const { check } = require('express-validator') //TODO <---
const { validarResultados } = require('../helpers/validarHelper')
const pool = require('../database/db.js');
const { validationResult } = require('express-validator') 

const validaPoligono = [ //Validacion para nombre_poligonos e id_usuarios44+
	check('nombre_poligono')
		.exists()
		.isLength({ max: 50 })
		.isString()
		.custom((value, { req })=>{
			let patron = /^$|^\s+$/;
			if (patron.test(value)) {
				return false
			} return true
		}),
		(req, res, next) => {
			const errores = validationResult(req);
			if (!errores.isEmpty()) {
			  return res.status(400).json({ error: 'Datos incorrectos' });
			}
		
			next();
		  }


]

const validaIdPoligono = [
	
	check('id_poligono')
		.exists()
		.isNumeric()
		.not()
		.isEmpty(),
			(req, res, next) => {
				const errores = validationResult(req);
				if (!errores.isEmpty()) {
				  return res.status(400).json({ error: 'Datos incorrectos' });
				}
			
				next();
			  }
	
]

module.exports = {validaPoligono, validaIdPoligono}