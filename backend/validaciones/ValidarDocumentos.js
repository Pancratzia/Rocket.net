const { validationResult, check } = require('express-validator') 
const { validarResultados } = require('../helpers/validarHelper'); 

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
      }),
      (req, res, next) => {
        const errores = validationResult(req);
    
        if (!errores.isEmpty()) {
          
          return res.status(400).json({ error: 'Datos incorrectos' });
        }
    
        next();
      }
  ]

const validarDocumento = [

  check('descripcion')
    .exists()
    .isLength({ max: 255 })
    .isString()
    .not().isEmpty(),

  check('id_usuario')
    .exists()
    .isString()
    .not().isEmpty(),
]

const validarActDocumento = [
  check('titulo')
  .optional(),
  check('descripcion')
  .optional(),
  check('id_usuario')
  .optional(),

]

module.exports = {validarIdDocumento, validarDocumento, validarActDocumento}