const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/actualizar', async (req, res) => {
    const libro = await pool.query('SELECT * from Libro');
    const categorias = await pool.query('SELECT * from categorias');
    const estados = await pool.query('SELECT * from estados');
    const tipo_transaccion = await pool.query('SELECT * from tipo_transaccion');
    console.log('el sistema ha recibido los datos', libro);
    res.render('GuardarLibro', {
        libro: libro,
        categorias: categorias,
        estados: estados,
        tipo_transaccion: tipo_transaccion,
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
router.post('/ingresoLibro/:id', async (req, res) => {
    const libro = await pool.query('SELECT * from Libro');
    const ID_Libro = libro.length + 1;
    const Titulo = req.body.titulo;
    const Precio = req.body.precio;
    const Autor = req.body.autor;
    const tipoTrans = req.body.tipoTrans;
    const Imperfectos = req.body.imperfectos;
    const Categoria = req.body.categoria;
    const Estado = req.body.estado;
    const ID_Usuario = req.params.id;
    console.log(tipoTrans);
    pool.query(`INSERT INTO libro VALUES('${ID_Libro}', '${Titulo}','${Precio}', '${Autor}', '${tipoTrans}','${Imperfectos}', '${Categoria}', '${Estado}','${ID_Usuario}');`)
    console.log("yey");
    res.redirect('/ingresar');
});
module.exports = router;