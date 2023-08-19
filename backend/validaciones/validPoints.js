const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')


const validatePuntos = [
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
			validateResult(req, res, next)
		}

]


module.exports = { validatePuntos }