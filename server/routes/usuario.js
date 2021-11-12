const express = require('express');
const router = express.Router();
const pool = require('../database');
//const { isLoggedIn } = require('../lib/auth'); 
//Escribimos las rutas que van a interactuar con la  tabla usuarios 

router.get('/add', (req, res) => {
    res.render('ejemplo')

});

router.get("/mostrar", async (req, res) => {
    const usuario = await pool.query("SELECT * FROM usuario");
    console.log("el sistema ha recibido los datos", usuario);
    const legible = JSON.stringify(usuario);
    console.log(legible, undefined, 2);
    res.render('IngresarLibro')
});

router.get('/registro', async (req, res) => {
    res.render('registro');
});
router.post('/registro', async (req, res) => {
    /*const nuevoUsuario = req.params.body;
    const id = nuevoUsuario.ID_Usuario;
    const username = nuevoUsuario.Username;
    const password = nuevoUsuario.Password;
    const correo = nuevoUsuario.Correo;
    const NombreComp = nuevoUsuario.Nombre_completo;
    const Telefono = nuevoUsuario.Telefono;
    const Departamento = nuevoUsuario.Departamento;
    const Calificacion = nuevoUsuario.Calificacion;
    */
    var username = req.body.usuario;
    var correo = req.body.email;
    var password = req.body.psw;
    pool.query(`INSERT INTO usuario(Username, Password, Correo, Nombre_completo, Telefono, Departamento, Calificacion) VALUES('${username}', '${password}','${correo}', 'Fulanito', '1234567','Lima', '0' );`)

    //     if(req.body.checkbox.checked=true){
    //         pool.query(`INSERT INTO usuario(Username, Password, Correo, Nombre_completo, Telefono, Departamento, Calificacion) VALUES('${username}', '${password}','${correo}', 'Fulanito', '1234567','Lima', '0' );`)
    //     }else{
    //         console.log("No se creó el usuario")
    //    }
    console.log("yey");
    res.redirect('Iniciarsesion')

});













module.exports = router;