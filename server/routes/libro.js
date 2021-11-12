const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/GuardarLibro', async (req, res) => {
    const libro = await pool.query('SELECT * from Libro');
    const readable = JSON.stringify(libro);
    console.log('el sistema ha recibido los datos', libro);
    console.log('el sistema ha recibido los datos en json', readable);

    res.render('GuardarLibro', {
        libro: libro,
    });
});
module.exports = router;