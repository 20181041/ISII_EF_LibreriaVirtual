const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {GetTransaccion1, AñadirTransaccion, GetTransaccion2, BorrarTransaccion} = require ('../arreglo')
const {GetListaUsuarios, BuscarLibroxID, GetCategoria,GetTipoTransaccion, GetEstado } = require ('../Generales')


router.get('/ZonaComunicacion', isLoggedIn,async(req, res) => {
    const usuario = await GetListaUsuarios();
    console.log('el sistema ha recibido los datos', usuario);
    res.render('ZonaComunicacion', {
        usuario: usuario,
    });
});

router.get('/ZonaConfirmacion',isLoggedIn, async(req, res) => {
    const usuario = await GetListaUsuarios();
    console.log('el sistema ha recibido los datos', usuario);
    res.render('ZonaConfirmacion', {
        usuario: usuario,
    });
});

router.post('/EnviarTransaccion' ,async(req,res)=> {
    const idU= req.body.IdUsuario
    const idL= req.body.IdLibro 
    const libro = await BuscarLibroxID(idL)
    AñadirTransaccion(libro, req.user.ID_Usuario, idU)
    res.redirect('MiPerfil-Transaccion')
});
router.post('/actualizar-calificacion', async(req, res) => {
    const Nueva_Calificacion = req.body.estrella;
    var Calificacion = parseInt(req.body.caliV);
    const ID_Vendedor = req.body.IDVendedor;
    if (typeof(Nueva_Calificacion) != "undefined") {
        Calificacion = Math.round((Calificacion + parseInt(Nueva_Calificacion)) / 2, 1);
        console.log(Calificacion)
        pool.query(`UPDATE usuario SET Calificacion='${Calificacion}' WHERE ID_Usuario='${ID_Vendedor}'`);
    }
    res.redirect('/catalogo')
});


router.get('/ZonaTransaccion', isLoggedIn,async(req, res) => {
    res.render('ZonaTransaccion')
});

router.post('/AceptarT', async(req,res) => {
    res.redirect('ZonaTransaccion')
});

router.post('/RechazarT', async(req,res) => {
    const id = req.body.Id_Usuario;
    const libro = req.body.Id_Libro ;
    BorrarTransaccion(id, libro);
});

router.get('/MiPerfil-Transaccion',isLoggedIn, async(req, res) => {
    const id = req.user.ID_Usuario;
    const libro = await GetTransaccion1(id);
    const libro2 = await GetTransaccion2(id);
    const categorias = await GetCategoria();
    const estados = await GetEstado();
    const tipo_transaccion = await GetTipoTransaccion();
    res.render('MiPerfilTrans', {
        libro: libro,
        libro2: libro2,
        categorias: categorias,
        estados: estados,
        tipo_transaccion: tipo_transaccion,
    });
});

module.exports = router;