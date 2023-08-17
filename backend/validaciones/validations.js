const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')


const validateAudit = [

  check('operacion')
    .exists()
	.isLength({ max: 100 })
	.custom((value, { req })=>{
		let patron = /^\s+$/;

		if(patron.test(value)){
			return false
		} return true
	})
    .not()
    .isEmpty(),
	check('id_usuario')
		.exists()
		.isNumeric(),
		(req, res, next) => {
			validateResult(req, res, next)
		}
]


// Otras validaciones abajo
//Validaciones de poligono POST
const validatePoliPost = [

	check('nombre_zona')
	.exists()
	.isLength({ max: 100 })
	.isAlphanumeric()
	.isEmpty(),
	check('id_usuario')
	.exists()
	.isNumeric(),
	(req, res, next) => {
		validateResult(req, res, next)
	}


]
const validatePuntPut = [

	check('id_zona')
	.exists()
	.isNumeric(),
	check('latitud')
	.exists()
	.isEmpty()
	.isAlphanumeric()
	.isLatLong(),
	check('longitud')
	.exists()
	.isEmpty()
	.isAlphanumeric()
	.isLatLong(),
	(req, res, next) => {
		validateResult(req, res, next)
	}
]

const validatePuntD = [

	check('id_punto')
	.exists()
	.isNumeric(),
	(req, res, next) => {
		validateResult(req, res, next)
	}

]

module.exports = { validateAudit, validatePoliPost, validatePuntPut,validatePuntD }