const { check } = require('express-validator') //TODO <---
const { validarResultados } = require('../helpers/validarHelper')

const validarIdUsuarios = [
  check('id_usuario')
  .exists().withMessage({error: 'El campo id_usuario no existe'})
  .isNumeric().withMessage({error: 'El campo id_usuario debe ser numérico'})
  .not()
  .isEmpty().withMessage({error: 'El campo id_usuario no puede estar vacío'})
    .custom((value, { req })=>{
      let patron = /^$|^\s+$/;
 
      if(patron.test(value)){
        return false
      } return true
    }).withMessage({error: 'El campo id_usuario no puede contener espacios vacios'}),
  (req, res, next) => {
    validarResultados(req, res, next)
  }
]

const validaActualizarUsuario = [
    check('nombre_usuario')
        .optional()
        .isLength({ max: 50 }).withMessage({error: 'El campo nombre_usuario no puede exceder los 50 caracteres'}),

    check('id_sededepar')
        .optional()
        .notEmpty().withMessage({error: 'El campo id_sededepar no puede estar vacío'})
        .isNumeric().withMessage({error: 'El campo id_sededepar debe ser numérico'}),

    check('id_tipousuario')
        .optional()
        .notEmpty().withMessage({error: 'El campo id_tipousuario no puede estar vacío'})
        .isNumeric().withMessage({error: 'El campo id_tipousuario debe ser numérico'}),

    check('nombre')
        .optional()
        .isLength({ max: 50 }).withMessage({error: 'El campo nombre no puede exceder los 50 caracteres'})
        .matches(/^[a-zA-Z\s]+$/).withMessage({error: 'El campo nombre solo puede contener letras y espacios'}),

    check('apellido')
        .optional()
        .isLength({ max: 50 }).withMessage({error: 'El campo apellido no puede exceder los 50 caracteres'})
        .matches(/^[a-zA-Z\s]+$/).withMessage({error:'El campo apellido solo puede contener letras y espacios'}),

    check('pregunta')
        .optional()
        .isLength({ max: 255 }).withMessage({error: 'El campo pregunta no puede exceder los 255 caracteres'}),

    check('respuesta')
        .optional()
        .isLength({ max: 250 }).withMessage({error: 'El campo respuesta no puede exceder los 250 caracteres'}),

    check('clave')
        .optional()
        .isLength({ min: 250 }).withMessage({error: 'El campo clave debe tener al menos 250 caracteres'}),

    check('extension_telefonica')
        .optional()
        .isLength({ max: 20 }).withMessage({error: 'El campo extension_telefonica no puede exceder los 20 caracteres'}),
    (req, res, next) => {
      validarResultados(req, res, next)
    }

];


module.exports = { validarIdUsuarios,validaActualizarUsuario }