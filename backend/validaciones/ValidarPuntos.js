const { check } = require('express-validator') //TODO <---
const { validarResultados } = require('../helpers/validarHelper')


const validaPuntos = [
	check('id_poligono')
	.exists().withMessage({error: 'Datos incorrectos'})
	.isNumeric().withMessage({error: 'Datos incorrectos'}),
	check('latitud')
	.exists().withMessage({error: 'Datos incorrectos'})
	.isNumeric().withMessage({error: 'Datos incorrectos'}),
		check('longitud')
	.exists().withMessage({error: 'Datos incorrectos'})
	.isNumeric().withMessage({error: 'Datos incorrectos'})
		.not()
		.isEmpty().withMessage({error: 'Datos incorrectos'}),
		(req, res, next) => {
			validarResultados(req, res, next)
		}

]

const validaidPuntos  = [
check('id_punto')
		.exists()
		.isNumeric().withMessage('Datos incorrectos')
			.not()
			.isEmpty(),
		(req, res, next) => {
			validarResultados(req, res, next)
		}

	]
module.exports = { validaPuntos, validaidPuntos }