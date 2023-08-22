const { check } = require('express-validator') //TODO <---
const { validarResultados } = require('../helpers/validarHelper')


const validaPuntos = [
	check('id_poligono')
	.exists()
	.isNumeric(),
	check('latitud')
	.exists()
	.isNumeric()
	.custom((value, { req })=>{
			let patron = /^\s+$/;
	
			if(patron.test(value)){
				return false
			} return true
		})
		.not()
		.isEmpty(),

		check('longitud')
	.exists()
	.isNumeric()
		.custom((value, { req })=>{
			let patron = /^\s+$/;
	
			if(patron.test(value)){
				return false
			} return true
		})
		.not()
		.isEmpty(),
		(req, res, next) => {
			validarResultados(req, res, next)
		}

]


module.exports = { validaPuntos }