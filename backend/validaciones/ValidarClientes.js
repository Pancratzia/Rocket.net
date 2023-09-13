const { validationResult, check} = require('express-validator')
const {validarResultados} = require('../helpers/validarHelper')

const validaidClientes =[
    check('id_cliente')
    .exists()
    .isNumeric()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      let patron = /^$|^\s+$/;

      if (patron.test(value)) {
        return false
      } return true
    }),
    (req, res, next) => {
        validarResultados(req, res, next)
}]
const validaClientes = [
    check('nombre')
    .exists()
    .isLength({ max: 50 })
    .isString()
    .not().isEmpty(),
    check('ubicacion')
    .isLength({ max: 255 })
    .isString()
    .not()
    .isEmpty(),
    check('telefono')
    .isLength({ max: 20 })
    .matches(/^[0-9]+$/)
    .not()
    .isEmpty(),
  check('id_plan')
    .exists()
    .isNumeric()
    .not()
    .isEmpty(),
  check('id_usuario')
    .exists()
    .isNumeric()
    .not()
    .isEmpty(),
    check('estado_usuario')
    .exists()
    .isNumeric()
    .not()
    .isEmpty(),
    (req, res, next) => {
        validarResultados(req, res, next)
}
]

module.exports = {validaidClientes, validaClientes}