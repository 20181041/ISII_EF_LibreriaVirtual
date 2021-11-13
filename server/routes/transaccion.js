const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/ZonaComunicacion', async (req, res) => {
    const usuario = await pool.query('SELECT * FROM usuario');
    console.log('el sistema ha recibido los datos', usuario);
    res.render('ZonaComunicacion', {
        usuario: usuario,
    });
});

router.get('/ZonaConfirmacion', async (req, res) => {
    const usuario = await pool.query('SELECT * FROM usuario');
    console.log('el sistema ha recibido los datos', usuario);
    res.render('ZonaConfirmacion', {
        usuario: usuario,
    });
});

router.get('/ZonaTransaccion', async (req, res) => {
    res.render('ZonaTransaccion')
});



router.get('/MiPerfilTrans', async (req, res) => {
    res.render('MiPerfilTrans')
});
module.exports = router;