const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')

const validateIdPoligono = [
	
	check('id_poligono')
		.exists()
		.isNumeric()
			.not()
			.isEmpty()
		.custom((value, { req })=>{
			let patron = /^$|^\s+$/;

			if(patron.test(value)){
				return false
			} return true
		}).withMessage('El campo id_poligono no puede estar vacio'),
		(req, res, next) => {
			validateResult(req, res, next)
		}
		
]

module.exports = { validateIdPoligono }