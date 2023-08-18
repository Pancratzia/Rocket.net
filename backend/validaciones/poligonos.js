const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')

const validatePoliPost = [

	check('nombre_poligono')
	.exists()
	.isLength({ max: 50 })
	.isString()
		.not()
		.isEmpty(),
	check('id_usuario')
	.exists()
	.isNumeric(),
	(req, res, next) => {
		validateResult(req, res, next)
	}


]

module.exports = {validatePoliPost}