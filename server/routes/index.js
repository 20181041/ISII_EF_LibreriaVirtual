const express = require('express');
const router = express.Router();

const libro1 = ["matilda","30", "Autor1", "Venta", "pág5 sucia", "comedia", "Pendiente", "matilda.png", "Comunicacion"];
const libro2 = ["coquito" ,"10", "Autor2", "Pendiente", "pág5 sucia", "comedia", "Compleato", "coquito.png", "Completado" ];
const libro3 = ["cenicienta","20", "Autor3", "Intercambio", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Comunicacion"  ];
const libro4 = ["floricienta","60", "Autor4", "Pendiente", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Transaccion"  ];
const libro5 = ["5 recetas de pan","10", "Autor5", "Intercambio", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Transaccion"  ];
const libro6 = ["mulan","5", "Autor6", "Venta", "pág5 sucia", "comedia", "Completado", "cenicienta.png", "Completado"  ];
const libro7 = ["10 historias de amor","20", "Autor7", "Pendiente", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Comunicacion"  ];
const libro8 = ["zombies","0", "Autor8", "Venta", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Transaccion"  ];
var listalibros = [libro1, libro2, libro3, libro4, libro5, libro6, libro7, libro8];

router.get('/', async (req, res) => {
    res.send('Aquí irá la página principal');
});

router.get('/catalogo', async (req, res) => {
    res.render('catalogo')
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