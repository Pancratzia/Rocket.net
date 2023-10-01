// Importacion de express
const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');
const { validationResult } = require('express-validator');
const { auditar,convertirMayusculas } = require('../funciones/funciones.js');

const { validaClientes, validaidClientes } = require('../validaciones/ValidarClientes.js');
//const { auditar } = require('../funciones/funciones.js')

const routerClientes = express.Router();
routerClientes.use(express.json());
routerClientes.use(cors());


//create
routerClientes.post('/', validaClientes, async (req, res) => {

  const consulta = `
  WITH validaciones AS (
    SELECT
      EXISTS (SELECT 1 FROM planes WHERE id_plan = $5) AS existePlan,
      EXISTS (SELECT 1 FROM usuarios WHERE id_usuario = $6) AS existeUsuario,
      NOT EXISTS (SELECT 1 FROM clientes WHERE correo = $4) AS correoNoExiste
      )
  INSERT INTO clientes (
    nombre, ubicacion, telefono, correo, id_plan, id_usuario, estado_usuario
  )
  SELECT
    $1, $2, $3, $4, $5, $6, $7
  FROM validaciones
  WHERE existePlan = true AND existeUsuario = true AND correoNoExiste
  RETURNING *;
`;
  try {

    const { nombre, ubicacion, telefono, correo, id_plan, estado_usuario } = req.body;

    const operacion = req.method;
    const id_usuario = req.headers['id_usuario'];

    const camposAmayusculas = ['nombre'];
    const camposMayus = convertirMayusculas(camposAmayusculas, req.body);

    const errores = validationResult(req);
    if (errores.isEmpty()) {
      const crearCliente = await pool.query(consulta, [
        camposMayus.nombre, ubicacion, telefono, correo, id_plan, id_usuario, estado_usuario
      ]);
      if (crearCliente.rows.length > 0) {
        auditar(operacion,id_usuario);
        return res.status(200).json({ mensaje: 'Cliente creado exitosamente' });
      } else {
        return res.status(400).json({ error: 'Error al crear el cliente' });
      }
    } else {
      return res.status(400).json({ error: 'Datos incorrectos' });
    }
  } catch (error) {
    console.error(error.message);
  }
});


//modificar cliente
routerClientes.put('/:id_cliente', validaClientes, validaidClientes, async (req, res) => {
  const query = `
    UPDATE clientes
    SET
      nombre = $1,
      ubicacion = $2,
      telefono = $3,
      correo = $4,
      id_plan = $5,
      id_usuario= $6,
      estado_usuario = $7
      WHERE id_cliente = $8
      AND NOT borrado
      AND EXISTS (SELECT 1 FROM planes WHERE id_plan = $5)
      AND EXISTS (SELECT 1 FROM usuarios WHERE id_usuario = $6)
      AND NOT EXISTS (SELECT 1 FROM clientes WHERE correo = $4 AND id_cliente <> $8)
    RETURNING *;
  `;
  try {
    const { id_cliente } = req.params;
    const {
      nombre, ubicacion, telefono, correo, id_plan, estado_usuario
    } = req.body;

    const operacion = req.method;
    const id_usuario = req.headers['id_usuario'];

    const camposAmayusculas = ['nombre'];
    const camposMayus = convertirMayusculas(camposAmayusculas, req.body);

    const actualizarCliente = await pool.query(query, [
      camposMayus.nombre, ubicacion, telefono, correo, id_plan, id_usuario, estado_usuario, id_cliente
    ]);

    if (actualizarCliente.rowCount > 0) {
      auditar(operacion,id_usuario);
      return res.status(200).json({ mensaje: 'Cliente actualizado exitosamente' });
    } else {
      return res.status(400).json({ error: 'Error al crear el cliente' });
    }
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
  }
});



//borrar cliente
routerClientes.patch('/:id_cliente', validaidClientes, async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const operacion = req.method;
    const id_usuario = req.headers['id_usuario'];

    // Validacion #1
    const clienteExistente = await pool.query('SELECT * FROM clientes WHERE id_cliente = $1 AND borrado = false', [id_cliente]);

    if (clienteExistente.rowCount === 0) {
      return res.status(404).json({ error: 'Datos incorrectos' });
    }

    // Actualiza el cliente y marca como borrado
    const updateQuery = `
      UPDATE clientes 
      SET borrado = true
      WHERE id_cliente = $1
      RETURNING *;
    `;

    await pool.query(updateQuery, [id_cliente]);

    res.json({ mensaje: 'Cliente eliminado correctamente' });
    auditar(operacion,id_usuario);
    
  } catch (error) {
    console.error('Error al marcar cliente como borrado:', error);
    res.status(500).json({ error: 'Datos incorrectos' });
  }
});


//obtener cliente
routerClientes.get('/', async (req, res) => {
  try {
    const clientes = await pool.query('SELECT id_cliente, nombre, ubicacion, telefono, correo, id_plan, id_usuario, estado_usuario FROM clientes WHERE borrado = false ORDER BY id_cliente ASC');
    res.json(clientes.rows);

  } catch (error) {
    console.log(error);
  }
});

//obtener un cliente
routerClientes.get('/:id_cliente', async (req, res) => {
  try {
    const { id_cliente } = req.params;
    const clientes = await pool.query('SELECT id_cliente, nombre, ubicacion, telefono, correo, id_plan, id_usuario, estado_usuario FROM clientes WHERE id_cliente = $1 AND borrado = false', [id_cliente]);
    if (clientes.rowCount === 0) {
      return res.status(404).json({ error: 'Datos incorrectos' });
    }
    res.json(clientes.rows[0]);

  } catch (error) {
    console.log(error);
  }
});

module.exports = routerClientes;