const { check } = require('express-validator') //TODO <---
const { validarResultados } = require('../helpers/validarHelper')
const pool = require('../database/db.js');

const validaPoligono = [ //Validacion para nombre_poligonos e id_usuarios44+
	check('nombre_poligono')
		.exists().withMessage('El campo nombre del poligono es obligatorio')
		.isLength({ max: 50 }).withMessage('El campo nombre del poligono no puede exceder los 50 caracteres')
		.isAlpha().withMessage('El campo nombre del poligono no puede ser numérico')
		.custom((value, { req })=>{
			let patron = /^$|^\s+$/;
			if (patron.test(value)) {
				return false
			} return true
		}).withMessage('El campo nombre del poligono no puede estar vacio'),
	

	(req, res, next) =>  { validarResultados(req, res, next) }


]

const validaIdPoligono = [
	
	check('id_poligono')
		.exists().withMessage({error: 'El campo id_poligono no existe'})
		.isNumeric().withMessage({error: 'El campo id_poligono debe ser numérico'})
		.not()
		.isEmpty().withMessage({error: 'El campo id_poligono no puede estar vacío'})
			.custom((value, { req })=>{
				let patron = /^$|^\s+$/;
	 
				if(patron.test(value)){
					return false
				} return true
			}).withMessage({error: 'El campo id_poligono no puede contener espacios vacios'}),
		(req, res, next) => {
			validarResultados(req, res, next)
		}	
]

module.exports = {validaPoligono, validaIdPoligono}