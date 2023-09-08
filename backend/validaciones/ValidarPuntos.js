const { check } = require('express-validator') //TODO <---
const { validarResultados } = require('../helpers/validarHelper')
const { validationResult } = require('express-validator') 


const validaPuntos = [
	check('id_poligono')
	.exists()
	.isNumeric(),

	check('latitud')
	.exists()
	.isNumeric(),
	
	check('longitud')
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
		];

const validaidPuntos  = [
check('id_punto')
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

module.exports = { validaPuntos, validaidPuntos }