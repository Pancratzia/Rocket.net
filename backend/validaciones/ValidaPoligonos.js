const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')

const validatePoligonos = [ //Validacion para nombre_poligonos e id_usuarios44+
	check('nombre_poligonos')
		.exists().withMessage('El campo nombre del poligono es obligatorio')
		.isLength({ max: 50 }).withMessage('El campo nombre del poligono no puede exceder los 50 caracteres')
		.custom((value, { req })=>{
			let patron = /^$|^\s+$/;
			if (patron.test(value)) {
				return false
			} return true
		}).withMessage('El campo nombre del poligono no puede estar vacio'),
	
	check('id_usuario')	
		.exists().withMessage('El campo id_usuario es requerido')
		.notEmpty().withMessage('El campo id_usuario no puede estar vacío')
		.isNumeric().withMessage('El campo id_usuario debe ser numérico')
		.custom(async (value) => {
			const query = 'SELECT COUNT(*) AS count FROM usuarios WHERE id_usuario=$1';
			const result = await pool.query(query, [value]);
			const count = result.rows[0].count;

			console.log("count", count)
			if (count == 0) {
			  throw new Error('El id_usuario no existe en la base de datos');
			}
			return true
		}).withMessage("El usuario no existe en la base de datos"),

	(req, res, next) =>  { validateResult(req, res, next) }


]

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
module.exports = {validatePoligonos, validateIdPoligono }