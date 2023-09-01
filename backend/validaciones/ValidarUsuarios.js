const { check } = require('express-validator') //TODO <---
const { validarResultados } = require('../helpers/validarHelper')
const pool = require('../database/db.js');

const validarIdUsuarios = [
  check('id_usuario')
    .exists().withMessage({ error: 'El campo id_usuario no existe' })
    .isNumeric().withMessage({ error: 'El campo id_usuario debe ser numérico' })
    .not()
    .isEmpty().withMessage({ error: 'El campo id_usuario no puede estar vacío' })
    .custom((value, { req }) => {
      let patron = /^$|^\s+$/;

      if (patron.test(value)) {
        return false
      } return true
    }).withMessage({ error: 'El campo id_usuario no puede contener espacios vacios' }),
  (req, res, next) => {
    validarResultados(req, res, next)
  }
]

const validarUsuario = [
  check('nombre_usuario')
    .exists().withMessage({ error: 'el campo nombre_usuario debe existir' })
    .isLength({ max: 50 }).withMessage({ error: 'El campo nombre_usuario no puede exceder los 50 caracteres' })
    .isString().withMessage({ error: 'El campo nombre_usuario debe ser String' })
    .not()
    .isEmpty().withMessage({ error: 'El campo nombre_usuario no debe estar vacia' }),

  check('id_sededepar')
    .exists().withMessage({ error: 'El campo id_sededepar no existe' })
    .isNumeric().withMessage({ error: 'El campo id_sededepar debe ser numérico' }),

  check('id_tipousuario')
    .exists().withMessage({ error: 'El campo id_tipousuario no existe' })
    .isNumeric().withMessage({ error: 'El campo id_tipousuario debe ser numérico' }),

  check('nombre')
    .exists().withMessage({ error: 'el campo nombre debe existir' })
    .isLength({ max: 50 }).withMessage({ error: 'El campo nombre no puede exceder los 50 caracteres' })
    .isString().withMessage({ error: 'El campo nombre debe ser String' })
    .not()
    .isEmpty().withMessage({ error: 'El campo nombre no debe estar vacia' }),

  check('apellido')
    .exists().withMessage({ error: 'el campo apellido debe existir' })
    .isLength({ max: 50 }).withMessage({ error: 'El campo apellido no puede exceder los 50 caracteres' })
    .isString().withMessage({ error: 'El campo apellido debe ser String' })
    .not()
    .isEmpty().withMessage({ error: 'El campo apellido no debe estar vacia' }),

  check('pregunta')
    .exists().withMessage({ error: 'El campo pregunta debe existir' })
    .isLength({ max: 255 }).withMessage({ error: 'El campo pregunta no puede exceder los 255 caracteres' })
    .isString().withMessage({ error: 'El campo pregunta debe ser String' })
    .not()
    .isEmpty().withMessage({ error: 'El campo pregunta no debe estar vacio' }),

  check('respuesta')
    .exists().withMessage({ error: 'El campo respuesta debe existir' })
    .isLength({ max: 255 }).withMessage({ error: 'El campo respuestaa no puede exceder los 255 caracteres' })
    .isString().withMessage({ error: 'El campo respuesta debe ser String' })
    .not()
    .isEmpty().withMessage({ error: 'El campo respuesta no debe estar vacio' }),

  check('clave')
    .exists().withMessage({ error: 'El campo clave debe existir' })
    .isLength({ max: 250 }).withMessage({ error: 'El campo clave debe tener al menos 250 caracteres' })
    .isString().withMessage({ error: 'El campo clave debe ser String' })
    .not()
    .isEmpty().withMessage({ error: 'El campo clav no debe estar vacio' }),

  check('extension_telefonica')
    .exists().withMessage({ error: 'El campo extension_telefonica debe existir' })
    .isLength({ max: 20 }).withMessage({ error: 'El campo extension_telefonica no puede exceder los 20 caracteres' })
    .isString().withMessage({ error: 'El campo extension_telefonica debe ser String' })
    .not()
    .isEmpty().withMessage({ error: 'El campo extension_telefonica no debe estar vacio' }),
  (req, res, next) => {
    validarResultados(req, res, next)
  }

];

const validarActUsuario = [
  check('nombre_usuario')
    .optional()
    .isLength({ max: 50 }).withMessage({ error: 'El campo nombre_usuario no puede exceder los 50 caracteres' }),

  check('id_sededepar')
    .optional()
    .notEmpty().withMessage({ error: 'El campo id_sededepar no puede estar vacío' })
    .isNumeric().withMessage({ error: 'El campo id_sededepar debe ser numérico' }),

  check('id_tipousuario')
    .optional()
    .notEmpty().withMessage({ error: 'El campo id_tipousuario no puede estar vacío' })
    .isNumeric().withMessage({ error: 'El campo id_tipousuario debe ser numérico' }),

  check('nombre')
    .optional()
    .isLength({ max: 50 }).withMessage({ error: 'El campo nombre no puede exceder los 50 caracteres' }),

  check('apellido')
    .optional()
    .isLength({ max: 50 }).withMessage({ error: 'El campo apellido no puede exceder los 50 caracteres' }),

  check('pregunta')
    .optional()
    .isLength({ max: 255 }).withMessage({ error: 'El campo pregunta no puede exceder los 255 caracteres' }),

  check('respuesta')
    .optional()
    .isLength({ max: 250 }).withMessage({ error: 'El campo respuesta no puede exceder los 250 caracteres' }),

  check('clave')
    .optional()
    .isLength({ max: 250 }).withMessage({ error: 'El campo clave debe tener al menos 250 caracteres' }),

  check('foto_usuario')
    .optional()
    .isLength({ max: 250 }).withMessage({ error: 'El campo foto_usuario no puede exceder los 250 caracteres' }),

  check('extension_telefonica')
    .optional()
    .isLength({ max: 8 }).withMessage({ error: 'El campo extension_telefonica no puede exceder los 8 caracteres' })
    .isNumeric().withMessage({ error: 'El campo extension_telefonica debe ser numérico' }),
    (req, res, next) => {
      validarResultados(req, res, next)
    }

];

module.exports = { validarIdUsuarios, validarActUsuario, validarUsuario }