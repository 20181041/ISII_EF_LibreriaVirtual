const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { GetListaUsuarios, BuscarLibroxID, GetCategoria, GetEstado, GetAreas } = require('../Generales')

router.get('/MiPerfil-Editar', isLoggedIn, async(req, res) => {
    var us1 = req.user;
    const listaAreas = await GetAreas();

    const ListaAreasArray = [];

    for (let x = 0; x < listaAreas.length; x++) {
        ListaAreasArray.push(listaAreas[x].Descripcion)
    }

    for (let x = 0; x < ListaAreasArray.length; x++) {

        if (ListaAreasArray[x] == us1.area) {
            ListaAreasArray.splice(x, 1);
        }
    }

    res.render('MiPerfilEditar', {
        usuario: us1,
        ListaAreas: ListaAreasArray
    });
});

router.get('/MiPerfil-Resumen', isLoggedIn, async(req, res) => {
    res.render('MiperfilResumen', {
        usuario: req.user
    });
});

router.post('/cambiarimg', (req, res) => {
    const id = req.user.ID_Usuario;
    const image = req.body.img;
    pool.query(`UPDATE usuario SET img='${image}' WHERE ID_Usuario= ${id}`)
    res.redirect('/MiperfilResumen', {
        usuario: req.user
    });
});

router.post('/MiPerfil-Resumen', async(req, res) => {
    const id = req.user.ID_Usuario;
    var nuevoUsername = req.body.usuario_nombres;
    var telefono = req.body.telefono;
    var area = req.body.area;
    var image = req.body.image;
    if (area != "Escoge un area") {
        pool.query(`UPDATE usuario SET Username='${nuevoUsername}', Telefono='${telefono}', area='${area}' WHERE ID_Usuario= ${id}`)
        GetListaUsuarios();
    }
    console.log(image)
    res.redirect('/MiPerfil-Resumen')
});

router.get('/MiPerfil-Tienda', isLoggedIn, async(req, res) => {
    const id = req.user.ID_Usuario;
    const libro = await BuscarLibroxID(id);
    const categorias = await GetCategoria();
    const estados = await GetEstado();

    res.render('Miperfilmt', {
        libro: libro,
        categorias: categorias,
        estados: estados,
    });
});


module.exports = router;