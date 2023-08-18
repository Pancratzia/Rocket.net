const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')

const validatePuntPut = [

	check('id_zona')
	.exists()
	.isNumeric(),
	check('latitud')
	.exists()
	.not()
	.isEmpty()
	.isAlphanumeric()
	.isLatLong(),
	check('longitud')
	.exists()
	.not()
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

module.exports = {validatePuntPut, validatePuntD}