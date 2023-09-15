const { validationResult, check } = require('express-validator') 
const { validarResultados } = require('../helpers/validarHelper') 

const validarIdDocumento = [
    check('id_documento')
      .exists()
      .isNumeric()
      .not()
      .isEmpty()
      .custom((value, { req }) => {
        let patron = /^$|^\s+$/;
  
        if (patron.test(value)) {
          return false
        } return true
      })
  ]

const validarDocumento = [
  check('titulo')
    .exists()
    .isLength({ max: 50 })
    .isString()
    .not().isEmpty(),
    
  check('descripcion')
    .exists()
    .isLength({ max: 255 })
    .isString()
    .not().isEmpty(),

  check('id_usuario')
    .exists()
    .isString()
    .not().isEmpty()
]

module.exports = {validarIdDocumento, validarDocumento}