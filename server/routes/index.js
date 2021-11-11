const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    res.send('Aquí irá la página principal');
});

router.get('/catalogo', async (req, res) => {
    res.render('catalogo')
});

router.get('/carrito', async (req, res) => {
    res.render('carrito')
});

router.get('/MiPerfil-Resumen', async (req, res) => {
    res.render('MiperfilResumen');
});

router.get('/MiPerfil-Transaccion', async (req, res) => {
    res.render('MiPerfilTrans');
});

router.get('/MiPerfil-Editar', async (req, res) => {
    res.render('Miperfilmtr');
});

module.exports = router;