const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')

const validateIdPoligono = [
	
	check('id_poligono')
		.exists()
		.isNumeric()
			.not()
			.isEmpty(),
		(req, res, next) => {
			validateResult(req, res, next)
		}
	
]

module.exports = { validateIdPoligono }