const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/GuardarLibro', async (req, res) => {
    const libro = await pool.query('SELECT * from Libro');
    var libros = [];
    for (var i = 0; i < libro.length; i++) {
        libros = [
            {
                id: i.id, name: i.Nombre, precio: i.precio, autor: i.autor, tipo: i.Tipo_Transaccion, imperfectos: i.imperfectos,
                categoria: i.Categoria, estado: i.estado, usuario: i.ID_Usuario, url: i.url
            },
        ];
    }
    var tagline = "No programming concept is complete without a cute animal mascot.";

    res.render('GuardarLibro', {
        libros: libros,
        tagline: tagline
    });
});
module.exports = router;