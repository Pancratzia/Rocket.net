const { check } = require('express-validator')
const { validarResultados } = require('../helpers/validarHelper')
const { validationResult } = require('express-validator') 

const validaIdPlan = [
    check('id_plan')
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
    ];
  

  const validarPlan = [
    check('nombre_plan')
      .exists()
      .isLength({ max: 50 })
      .isString()
      .not().isEmpty(),
    check('descripcion')
      .exists()
      .isLength({ max: 255 })
      .isString()
      .not().isEmpty(),
    check('precio')
      .exists()
      .isNumeric()
      .not()
      .isEmpty(),
    check('id_sede')
      .exists()
      .isNumeric()
      .not()
      .isEmpty(),

      (req, res, next) => {
        const errores = validationResult(req);
    
        if (!errores.isEmpty()) {
          return res.status(400).json({ error: 'Datos incorrectos' });
        }
    
        next();
      }

  ];

  module.exports = { validaIdPlan, validarPlan }