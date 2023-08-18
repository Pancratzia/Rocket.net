const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')

const validateIdPoligono = [
	
	check('id')
		.exists()
		.not()
		.isEmpty()
		.isNumeric(),
		(req, res, next) => {
			validateResult(req, res, next)
		}
	
]

module.exports = { validateIdPoligono }