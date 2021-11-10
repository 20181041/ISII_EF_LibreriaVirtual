const express = require('express');
const router = express.Router();
const pool = require('../database');
//const { isLoggedIn } = require('../lib/auth');

//Escribimos las rutas que van a interactuar con la  tabla usuarios 

router.get('/add' , (req, res) =>{

 res.render('ejemplo')




});



router.get('/mostrar' , async (req, res) =>{

    const usuario = await pool.query('SELECT * FROM usuario');


    console.log('el sistema ha recibido los datos',usuario);

    const legible = JSON.stringify(usuario);

    console.log(legible, undefined , 2);
    res.render('ejemplo')
   
   
   });


module.exports = router;