const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { GetCarrito, VerUsuarios} = require('../arreglo')




router.get('/catalogo', isLoggedIn, async (req, res) => {
    VerUsuarios();
    const libro = await pool.query('SELECT * from libro');
    console.log(`hola tu id es ${req.user.ID_Usuario} y tu nombres es ${req.user.Username} ` )
    carrito = await GetCarrito(req.user.ID_Usuario);
    res.render('catalogo', {
        libro: libro,
        nombre: req.user.Username,
        id_usuario: req.user.ID_Usuario,
        LibrosEnCarrito: carrito.length
    });
});


module.exports = router;