const { check } = require('express-validator') //TODO <---
const { validarResultados } = require('../helpers/validarHelper')


const validaAuditoria = [

  check('operacion')
  	.exists()
		.isLength({ max: 100 })
		.custom((value, { req })=>{
		let patron = /^\s+$/;

		if(patron.test(value)){
			return false
		} return true
	})
	.isString()
    .not()
    .isEmpty(),
	check('id_usuario')
		.exists()
		.isNumeric(),
		(req, res, next) => {
			validarResultados(req, res, next)
		}
]



module.exports = { validateAudit }

