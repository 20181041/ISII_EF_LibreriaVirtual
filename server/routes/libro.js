const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/ingresar', async (req, res) => {
    const libro = await pool.query('SELECT * from Libro');
    const categorias = await pool.query('SELECT * from categorias');
    const estados = await pool.query('SELECT * from estados');
    const tipo_transaccion = await pool.query('SELECT * from tipo_transaccion');
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
    const descripcion = req.body.descripcion;
    const Categoria = req.body.categoria;
    const Estado = req.body.estado;
    const ID_Usuario = req.params.id;
    console.log('Este es el usuario', user.ID_Usuario);
    pool.query(`INSERT INTO libro VALUES('${ID_Libro}', '${Titulo}','${Precio}', '${Autor}', '${tipoTrans}','${Imperfectos}', '${Categoria}', '${Estado}','${ID_Usuario}','${descripcion}');`)

    res.redirect('/ingresar');
});
router.get('/actualizar/:idLibro', async (req, res) => {
    const libro = await pool.query(`SELECT * from Libro where ID_Libro = ${req.params.idLibro}`);
    const categorias = await pool.query('SELECT * from categorias');
    const estados = await pool.query('SELECT * from estados');
    const tipo_transaccion = await pool.query('SELECT * from tipo_transaccion');
    res.render('GuardarLibro', {
        libro: libro,
        categorias: categorias,
        estados: estados,
        tipo_transaccion: tipo_transaccion,
    });
});
router.post('/actualizoLibro/:id/:idLibro', async (req, res) => {
    const ID_Libro = req.params.idLibro;
    const Titulo = req.body.titulo;
    const Precio = req.body.precio;
    const Autor = req.body.autor;
    const tipoTrans = req.body.tipoTrans;
    const Imperfectos = req.body.imperfectos;
    const descripcion = req.body.descripcion;
    const Categoria = req.body.categoria;
    const Estado = req.body.estado;
    const ID_Usuario = req.params.id;

    pool.query(`UPDATE usuario SET Nombre='${Titulo}', Precio='${Precio}', Autor='${Autor}', Tipo_Transaccion='${tipoTrans}',  Imperfectos='${Imperfectos}', Categoria='${Categoria}', Estado='${Estado}', ID_Usuario='${ID_Usuario}', descripcion='${descripcion}' WHERE ID_Libro= '${ID_Libro}'`)


    res.redirect(`/actualizar/${ID_Libro}`);
});
module.exports = router;