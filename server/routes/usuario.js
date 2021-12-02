const express = require('express');
const router = express.Router();
const pool = require('../database');
const Vonage = require('@vonage/server-sdk')
const {arreglogeneral, añadirnuevo, añadircarrito, vercarrito, BuscarUsuario} = require('../arreglo')
const vonage = new Vonage({
  apiKey: "97c4a7e0",
  apiSecret: "vfouBNKkgkrO1wR2"
})
const { isLoggedIn } = require('../lib/auth');
//const { isLoggedIn } = require('../lib/auth'); 
//Escribimos las rutas que van a interactuar con la  tabla usuarios 


router.get('/add', (req, res) => {
    res.render('ejemplo')

});

router.get("/mostrar", isLoggedIn,async (req, res) => {
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
    var area = req.body.areausuario;
    pool.query(`INSERT INTO usuario(Username, Password, Correo, Nombre_completo, Telefono, area, Calificacion) VALUES('${username}123', '${password}','${correo}', '${username}', '1','${area}', '1' );`)

    //     if(req.body.checkbox.checked=true){
    //         pool.query(`INSERT INTO usuario(Username, Password, Correo, Nombre_completo, Telefono, Departamento, Calificacion) VALUES('${username}', '${password}','${correo}', 'Fulanito', '1234567','Lima', '0' );`)
    //     }else{
    //         console.log("No se creó el usuario"where Correo = '${correo}'`)
    //    } 
    
    var id;
    const lista_usuarios = await pool.query('SELECT * FROM usuario');
    for(p in lista_usuarios){
        if(lista_usuarios[p].Correo == correo){
            id = lista_usuarios[p].ID_Usuario
        }
    }
    console.log(id)
    añadirnuevo(id)
    
    res.redirect('Verificacion')
});

router.get('/IngreseCodigo', (req,res)=> {
    res.render('IngreseCodigo')
    

});

router.get('/Verificacion', (req,res) => {
    res.render('Verificacion')

   
    
});

router.post('/AnadirNumero', (req,res) => {
    
    NumeroTef = req.body.telefono;
    codigo = 12345;
   
    //pool.query(`UPDATE usuario SET Username='${nuevoUsername}', Telefono='${telefono}', area='${area}' WHERE ID_Usuario= ${id}`)

    res.render('IngreseCodigo', {
        telefono : NumeroTef,
        codigo: codigo
    })

    const from = "Vonage APIs"
    const to = "51" + NumeroTef
    const text = 'Tu codigo es: ' + codigo
    
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })

    
});

router.get('/recuperarpassword', (req, res) => {
    res.render('password')

});

router.post('/Validar',(req,res) => {
    codigo = req.body.codigoc
    codigo2= req.body.codigonuevo 
    if(codigo == codigo2){
        res.redirect('/IniciarSesion')
    }
});

module.exports = router;