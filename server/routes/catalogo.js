const express = require('express');
const router = express.Router();
const pool = require('../database');
 
router.get('/catalogo', async (req, res) => {
    const libro = await pool.query('SELECT * from libro');

    console.log('el sistema ha recibido los datos', libro);
 
    res.render('catalogo', {
        libro: libro
    });
});


module.exports = router;