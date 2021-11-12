const express = require('express');
const router = express.Router();
const pool = require('../database');
 
function buscar_id(a, b){
    var us1;
    
    for(let x = 0; x < a.length; x++){
        if(a[x].ID_Usuario == b){
            us1 = a[x];
        }
    }
    return us1
}

router.get('/catalogo/', async (req, res) => {
    
    const libro = await pool.query('SELECT * from libro');
    const listaUsuarios = await pool.query('SELECT * FROM usuario');


    console.log('el sistema ha recibido los datos', libro);
 
    res.render('catalogo', {
        libro: libro,
        
    });
});


module.exports = router;