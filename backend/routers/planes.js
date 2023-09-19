const express = require('express');
const cors = require('cors');
const pool = require('../database/db.js');
const routerPlanes = express.Router();
const { validaIdPlan, validarPlan } = require('../validaciones/ValidarPlanes.js');
const { validationResult } = require('express-validator')

routerPlanes.use(express.json());
routerPlanes.use(cors());


//create 
routerPlanes.post('/', validarPlan, async (req, res) => {
    try {
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        const { nombre_plan, descripcion, precio, estado_plan } = req.body;

        // Verificar si ya existe un plan con el mismo nombre
        const planExistente = await pool.query(
            'SELECT * FROM planes WHERE nombre_plan = $1',
            [nombre_plan]
        );

        if (planExistente.rows.length > 0) {
            return res.status(400).json({ error: 'El nombre del plan ya está en uso' });
        }

        // Insertar el nuevo plan en la base de datos
        const query = `
            INSERT INTO planes (nombre_plan, descripcion, precio, estado_plan, borrado)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;

        const values = [nombre_plan, descripcion, precio, estado_plan, false];

        const nuevoPlan = await pool.query(query, values);
        const idPlanGenerado = nuevoPlan.rows[0].id_plan;

        return res.status(200).json({ mensaje: 'Plan creado exitosamente', id_plan: idPlanGenerado });
    } catch (error) {
        console.error('Error al crear el plan:', error.message);
        res.status(500).json({ error: 'Error al crear el plan' });
    }
});
// get all planes
routerPlanes.get('/', async (req, res) => {
    try {
        const query = `
            SELECT id_plan, nombre_plan, descripcion, precio, estado_plan
            FROM planes
            WHERE borrado = false
            ORDER BY id_plan ASC;
        `;

        const { rows } = await pool.query(query);

        res.status(200).json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al obtener los planes' });
    }
});


// Get a plan por su id
routerPlanes.get('/:id_plan', validaIdPlan, async (req, res) => {
    try {
        const { id_plan } = req.params;
        const errores = validationResult(req);

        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        const query = `
            SELECT id_plan, nombre_plan, descripcion, precio, estado_plan
            FROM planes
            WHERE id_plan = $1 AND borrado = false;
        `;

        const { rows } = await pool.query(query, [id_plan]);

        if (rows.length === 1) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'Plan no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el plan por ID:', error.message);
        res.status(500).json({ error: 'Error al obtener el plan por ID' });
    }
});


// eliminar plan
routerPlanes.patch('/:id_plan', validaIdPlan, async (req, res) => {
    try {
        const { id_plan } = req.params;
        const errores = validationResult(req);

        if (errores.isEmpty()) {
            const updateQuery = `
                UPDATE planes 
                SET borrado = true
                WHERE id_plan = $1
                AND borrado = false  -- Agregamos esta condición para verificar que el plan no esté marcado como borrado
                RETURNING *;
            `;

            const updatedPlan = await pool.query(updateQuery, [id_plan]);

            if (updatedPlan.rowCount === 1) {
                return res.status(200).json({ mensaje: 'Plan eliminado correctamente' });
            } else {
                return res.status(404).json({ error: 'Plan no encontrado' });
            }
        } else {
            return res.status(400).json({ error: 'Error al borrar el plan' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Error al borrar el plan' });
    }
});


// modificar planes
routerPlanes.put('/:id_plan', validaIdPlan, validarPlan, async (req, res) => {

    const { id_plan } = req.params;
   
    const { nombre_plan, descripcion, precio, estado_plan } = req.body;

    try {
        const query = `
            UPDATE planes
            SET nombre_plan = $1, descripcion = $2, precio = $3, estado_plan = $4
            WHERE id_plan = $5
            AND borrado = false
            AND NOT EXISTS (
                SELECT 1 FROM planes WHERE nombre_plan = $1 AND id_plan <> $5 AND borrado = false
            )
            RETURNING *;
        `;

        const values = [nombre_plan, descripcion, precio, estado_plan, id_plan];

        const actualizarPlan = await pool.query(query, values);

        if (actualizarPlan.rowCount > 0) {
            return res.status(200).json({ mensaje: 'Plan actualizado exitosamente' });
        } else {
            return res.status(404).json({ error: 'Error al modificar plan' });
        }
    } catch (error) {
        console.error('Error al modificar el plan:', error.message);
        return res.status(500).json({ error: 'Error al modificar el plan' });
    }
});



module.exports = routerPlanes;