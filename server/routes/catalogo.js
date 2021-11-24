const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');





router.get('/catalogo', isLoggedIn, async (req, res) => {
    const libro = await pool.query('SELECT * from libro');
    console.log(`hola tu id es ${req.user.ID_Usuario} y tu nombres es ${req.user.Username} ` )

    res.render('catalogo', {
        libro: libro,
        id_usuario: req.user
    });
});


module.exports = router;