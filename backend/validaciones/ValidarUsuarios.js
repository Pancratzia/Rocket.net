const { validationResult, check } = require('express-validator') 
const { validarResultados } = require('../helpers/validarHelper')

const validarIdUsuario = [
  check('id_usuario')
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

const validarUsuario = [
  check('nombre_usuario')
    .exists()
    .isLength({ max: 50 })
    .isString()
    .not().isEmpty(),
  check('id_sededepar')
    .exists()
    .isNumeric()
    .not()
    .isEmpty(),
  check('id_tipousuario')
    .exists()
    .isNumeric()
    .not()
    .isEmpty(),
  check('nombre')
    .exists()
    .isLength({ max: 50 })
    .matches(/^[A-Za-z\s]+$/)
    .not()
    .isEmpty(),
  check('apellido')
    .exists()
    .isLength({ max: 50 })
    .matches(/^[A-Za-z\s]+$/)
    .not()
    .isEmpty(),
  check('pregunta')
    .exists()
    .isString()
    .isLength({ max: 255 })
    .not()
    .isEmpty(),
  check('respuesta')
    .isLength({ max: 255 })
    .isString()
    .not()
    .isEmpty(),
  check('clave')
    .isLength({ max: 255 })
    .isString()
    .not()
    .isEmpty(),
  check('extension_telefonica')
    .isLength({ max: 8 })
    .matches(/^[0-9]+$/)
    .not()
    .isEmpty(),
  check('telefono')
    .isLength({ max: 20 })
    .matches(/^[0-9]+$/)
    .not()
    .isEmpty(),
  check('cedula')
    .matches(/^[0-9]+$/)
    .isLength({ max: 20 })
    .not()
    .isEmpty()
];

const validarActUsuario = [
  check('nombre_usuario')
    .optional(),

  check('id_sededepar')
    .optional(),

  check('id_tipousuario')
    .optional(),

  check('nombre')
    .optional(),

  check('apellido')
    .optional(),

  check('pregunta')
    .optional(),

  check('respuesta')
    .optional(),

  check('clave')
    .optional(),

  check('foto_usuario')
    .optional(),

  check('extension_telefonica')
    .optional(),

  check('telefono')
    .optional(),

  check('cedula')
    .optional(),

  check('correo')
    .optional(),
  (req, res, next) => {
    validarResultados(req, res, next)
  }

];

const validarpathusuario = [
  check('nombre_usuario')
    .exists()
    .isLength({ max: 50 })
    .isString()
    .not().isEmpty(),
  check('id_sededepar')
    .exists()
    .isNumeric()
    .not()
    .isEmpty(),
  check('id_tipousuario')
    .exists()
    .isNumeric()
    .not()
    .isEmpty(),
  check('nombre')
    .exists()
    .isLength({ max: 50 })
    .isAlpha('es-ES')
    .not()
    .isEmpty(),
  check('apellido')
    .exists()
    .isLength({ max: 50 })
    .isAlpha('es-ES')
    .not()
    .isEmpty(),
  check('pregunta')
    .exists()
    .isString()
    .isLength({ max: 255 })
    .not()
    .isEmpty(),
  check('extension_telefonica')
    .isLength({ max: 8 })
    .matches(/^[0-9]+$/)
    .not()
    .isEmpty(),
  check('telefono')
    .isLength({ max: 20 })
    .matches(/^[0-9]+$/)
    .not()
    .isEmpty(),
  check('cedula')
    .matches(/^[0-9]+$/)
    .isLength({ max: 20 })
    .not()
    .isEmpty()
]

module.exports = { validarIdUsuario, validarActUsuario, validarUsuario, validarpathusuario }