const express = require('express');
const router = express.Router();





router.get('/', async (req, res) => {
    res.send('Aquí irá la página principal');
});



router.get('/carrito', async (req, res) => {
    var listadelibros = listalibros;
    res.render('carrito', {
        LibrosCarrito : listadelibros
    })
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

router.get('/Ejemplo', async (req, res) => {
    res.render('ejemplo');
});

module.exports = router;