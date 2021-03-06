const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { BuscarLibroxID, GetCategoria, GetTipoTransaccion, GetEstado, GetListaLibros } = require('../Generales')
const { AñadirATienda } = require('../arreglo')


router.get('/ingresar', isLoggedIn, async(req, res) => {
    const libro = await GetListaLibros();
    const categorias = await GetCategoria();
    const estados = await GetEstado();
    const tipo_transaccion = await GetTipoTransaccion();
    res.render('IngresarLibro', {
        usuario: req.user,
        libro: libro,
        categorias: categorias,
        estados: estados,
        tipo_transaccion: tipo_transaccion,
    });
});
router.post('/ingresoLibro/:id', async(req, res) => {
    const libro = await GetListaLibros()
    const ID_Libro = libro.length + 1;
    const Titulo = req.body.titulo;
    const Precio = req.body.precio;
    const Autor = req.body.autor;
    const tipoTrans = req.body.tipoTrans;
    const Imperfectos = req.body.imperfectos;
    const descripcion = req.body.descripcion;
    const Categoria = req.body.categoria;
    const Estado = req.body.estado;
    const ID_Usuario = req.user.ID_Usuario;
    console.log('Este es el usuario', ID_Usuario);
    pool.query(`INSERT INTO libro VALUES('${ID_Libro}', '${Titulo}','${Precio}', '${Autor}', '${tipoTrans}','${Imperfectos}', '${Categoria}', '${Estado}','${ID_Usuario}','${descripcion}');`)

    res.redirect('/ingresar');
});
router.get('/actualizar/:idLibro', isLoggedIn, async(req, res) => {
    const libro = await BuscarLibroxID(req.params.idLibro);
    const categorias = await GetCategoria();
    const estados = await GetEstado();
    const tipo_transaccion = await GetTipoTransaccion();
    res.render('GuardarLibro', {
        libro: libro,
        categorias: categorias,
        estados: estados,
        tipo_transaccion: tipo_transaccion,
    });
});
router.post('/actualizoLibro/:idLibro', async(req, res) => {
    const ID_Libro = req.params.idLibro;
    const Titulo = req.body.titulo;
    const Precio = req.body.precio;
    const Autor = req.body.autor;
    const tipoTrans = req.body.tipoTrans;
    const Imperfectos = req.body.imperfectos;
    const descripcion = req.body.descripcion;
    const Categoria = req.body.categoria;
    const Estado = req.body.estado;
    const ID_Usuario = req.user.ID_Usuario;

    pool.query(`UPDATE libro SET Nombre='${Titulo}', Precio='${Precio}', Autor='${Autor}', Tipo_Transaccion='${tipoTrans}',  Imperfectos='${Imperfectos}', Categoria='${Categoria}', Estado='${Estado}', ID_Usuario='${ID_Usuario}', descripcion='${descripcion}' WHERE ID_Libro = '${ID_Libro}'`)


    res.redirect(`/actualizar/${ID_Libro}`);
});
module.exports = router;