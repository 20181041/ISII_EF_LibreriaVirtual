const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/ZonaComunicacion', async(req, res) => {
    const usuario = await pool.query('SELECT * FROM usuario');
    console.log('el sistema ha recibido los datos', usuario);
    res.render('ZonaComunicacion', {
        usuario: usuario,
    });
});

router.get('/ZonaConfirmacion', async(req, res) => {
    const usuario = await pool.query('SELECT * FROM usuario');
    console.log('el sistema ha recibido los datos', usuario);
    res.render('ZonaConfirmacion', {
        usuario: usuario,
    });
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


router.get('/ZonaTransaccion', async(req, res) => {
    res.render('ZonaTransaccion')
});



router.get('/MiPerfil-Transaccion', async(req, res) => {
    const libro = await pool.query('SELECT * from Libro');
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