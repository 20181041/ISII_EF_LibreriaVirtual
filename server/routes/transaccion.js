const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {GetTransaccion1, AñadirTransaccion, BuscarLibroxID} = require ('../arreglo')

router.get('/ZonaComunicacion', isLoggedIn,async(req, res) => {
    const usuario = await pool.query('SELECT * FROM usuario');
    console.log('el sistema ha recibido los datos', usuario);
    res.render('ZonaComunicacion', {
        usuario: usuario,
    });
});

router.get('/ZonaConfirmacion',isLoggedIn, async(req, res) => {
    const usuario = await pool.query('SELECT * FROM usuario');
    console.log('el sistema ha recibido los datos', usuario);
    res.render('ZonaConfirmacion', {
        usuario: usuario,
    });
});

router.post('/EnviarTransaccion' ,async(req,res)=> {
    const idU= req.body.IdUsuario
    const idL= req.body.IdLibro 
    const libro = await BuscarLibroxID(idL)
    AñadirTransaccion(libro, req.user.ID_Usuario, idU)
    res.redirect('MiPerfil-Transaccion')
});
router.post('/actualizar-calificacion', async(req, res) => {
    const Nueva_Calificacion = req.body.estrella;
    var Calificacion = parseInt(req.body.caliV);
    const ID_Vendedor = req.body.IDVendedor;
    if (typeof(Nueva_Calificacion) != "undefined") {
        Calificacion = Math.round((Calificacion + parseInt(Nueva_Calificacion)) / 2, 1);
        console.log(Calificacion)
        pool.query(`UPDATE usuario SET Calificacion='${Calificacion}' WHERE ID_Usuario='${ID_Vendedor}'`);
    }
    res.redirect('/catalogo')
});


router.get('/ZonaTransaccion', isLoggedIn,async(req, res) => {
    res.render('ZonaTransaccion')
});



router.get('/MiPerfil-Transaccion',isLoggedIn, async(req, res) => {
    const id = req.user.ID_Usuario;
    const libro = await GetTransaccion1(id);
    const categorias = await pool.query('SELECT * from categorias');
    const estados = await pool.query('SELECT * from estados');
    const tipo_transaccion = await pool.query('SELECT * from tipo_transaccion');
    res.render('MiPerfilTrans', {
        libro: libro,
        categorias: categorias,
        estados: estados,
        tipo_transaccion: tipo_transaccion,
    });
});
module.exports = router;