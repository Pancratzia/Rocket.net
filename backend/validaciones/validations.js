const { check } = require('express-validator') //TODO <---
const { validateResult } = require('../helpers/validateHelper')


const validateAudit = [

  check('operacion')
    .exists()
	.isLength({ max: 100 })
	.custom((value, { req })=>{
		let patron = /^\s+$/;

		if(patron.test(value)){
			return false
		} return true
	})
    .not()
    .isEmpty(),
	check('id_usuario')
		.exists()
		.isNumeric(),
		(req, res, next) => {
			validateResult(req, res, next)
		}
]





module.exports = { validateAudit }