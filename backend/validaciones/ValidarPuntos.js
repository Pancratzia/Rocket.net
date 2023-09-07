const { check } = require('express-validator') //TODO <---
const { validarResultados } = require('../helpers/validarHelper')


const validaPuntos = [
	check('id_poligono')
	.exists().withMessage({error: 'El campo id_poligono no existe'})
	.isNumeric().withMessage({error: 'El campo id_poligono debe ser numérico'}),
	check('latitud')
	.exists().withMessage({error: 'El campo latitud debe existir'})
	.isNumeric().withMessage({error: 'El campo latitud debe ser numérico'}),
		check('longitud')
	.exists().withMessage({error: 'El campo longitud debe existir'})
	.isNumeric().withMessage({error: 'El campo longitud debe ser numérico'})
		.not()
		.isEmpty().withMessage({error: 'El campo longitud no debe estar vacio'}),
		(req, res, next) => {
			validarResultados(req, res, next)
		}

]

const validaidPuntos  = [
check('id_punto')
		.exists()
		.isNumeric().withMessage('El campo id_punto debe ser numérico')
			.not()
			.isEmpty(),
		(req, res, next) => {
			validarResultados(req, res, next)
		}

	]
module.exports = { validaPuntos, validaidPuntos }