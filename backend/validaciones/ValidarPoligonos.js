const { check } = require('express-validator') //TODO <---
const { validarResultados } = require('../helpers/validarHelper')
const pool = require('../database/db.js');

const validaPoligono = [ //Validacion para nombre_poligonos e id_usuarios44+
	check('nombre_poligono')
		.exists().withMessage('El campo nombre del poligono es obligatorio')
		.isLength({ max: 50 }).withMessage('El campo nombre del poligono no puede exceder los 50 caracteres')
		.custom((value, { req })=>{
			let patron = /^$|^\s+$/;
			if (patron.test(value)) {
				return false
			} return true
		}).withMessage('El campo nombre del poligono no puede estar vacio'),
		
]

const validaIdPoligono = [
	
	check('id_poligono')
		.exists()
		.isNumeric()
			.not()
			.isEmpty().custom(async (value) => {
				const query = 'SELECT COUNT(*) AS count FROM poligonos WHERE id_poligono=$1';
				const result = await pool.query(query, [value]);
				const count = result.rows[0].count;
				if (count == 0) {
				throw new Error('El id_poligono no existe en la base de datos');
				}
				return true
			}),
		(req, res, next) => {
			validarResultados(req, res, next)
		}	
]

module.exports = {validaPoligono, validaIdPoligono}