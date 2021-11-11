const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/GuardarLibro', async (req, res) => {
    const libro = await pool.query('SELECT * from Libro');
    const readable = JSON.stringify(libro);
    var libros = [];
    for (var i = 0; i < readable.length; i++) {
        libros = [
            {
                id: i.ID_Libro, name: i.Nombre,
                precio: i.precio, autor: i.autor,
                tipo: i.Tipo_Transaccion, imperfectos: i.imperfectos,
                categoria: i.Categoria, estado: i.estado,
                usuario: i.ID_Usuario, url: i.url
            },
        ];
    }
    console.log('el sistema ha recibido los datos', libro);
    console.log('el sistema ha recibido los datos en json', readable);

    res.render('GuardarLibro', {
        libro: libro,
        // tagline: tagline
    });
});
module.exports = router;