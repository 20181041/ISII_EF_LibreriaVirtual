const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/catalogo/:id', async (req, res) => {
    const libro = await pool.query('SELECT * from libro');
    const id = req.params.id;

    res.render('catalogo', {
        libro: libro,
        id_usuario: id
    });
});


module.exports = router;