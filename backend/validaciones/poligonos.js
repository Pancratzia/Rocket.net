const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')

const validatePoliPost = [

	check('nombre_zona')
	.exists()
	.not()
	.isEmpty()
    .isLength({ max: 50 })
	.isAlphanumeric(),
	check('id_usuario')
	.exists()
	.isNumeric(),
	(req, res, next) => {
		validateResult(req, res, next)
	}


]

module.exports = {validatePoliPost}