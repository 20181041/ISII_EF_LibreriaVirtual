const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/actualizar', async (req, res) => {
    const libro = await pool.query('SELECT * from Libro');
    const categorias = await pool.query('SELECT * from categorias');
    const estados = await pool.query('SELECT * from estados');

    console.log('el sistema ha recibido los datos', libro);

    res.render('GuardarLibro', {
        libro: libro,
        categorias: categorias,
        estados: estados
    });
});

router.get('/ingresar', async (req, res) => {
    const libro = await pool.query('SELECT * from Libro');
    const categorias = await pool.query('SELECT * from categorias');
    const estados = await pool.query('SELECT * from estados');
    const tipo_transaccion = await pool.query('SELECT * from tipo_transaccion');

    console.log('el sistema ha recibido los datos', libro);

    res.render('IngresarLibro', {
        libro: libro,
        categorias: categorias,
        estados: estados,
        tipo_transaccion: tipo_transaccion,
    });
});

module.exports = router;