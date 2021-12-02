const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

function buscar_id(a, b) {
    var us1;

    for (let x = 0; x < a.length; x++) {
        if (a[x].ID_Usuario == b) {
            us1 = a[x];
        }
    }
    return us1
}

router.get('/MiPerfil-Editar', isLoggedIn, async(req, res) => {

    const id = req.user.ID_Usuario;
    const listaUsuarios = await pool.query('SELECT * FROM usuario');
    var us1 = buscar_id(listaUsuarios, id);
    const listaAreas = await pool.query('SELECT Descripcion FROM areas');

    const ListaAreasArray = [];

    for (let x = 0; x < listaAreas.length; x++) {
        ListaAreasArray.push(listaAreas[x].Descripcion)
    }

    for (let x = 0; x < ListaAreasArray.length; x++) {

        if (ListaAreasArray[x] == us1.area) {
            ListaAreasArray.splice(x, 1);
        }
    }

    for (let x = 0; x < listaUsuarios.length; x++) {
        console.log(listaUsuarios[x].area)
    }

    res.render('MiPerfilEditar', {
        usuario: req.user,
        ListaAreas: ListaAreasArray
    });
});

router.get('/MiPerfil-Resumen', isLoggedIn, async(req, res) => {

    const id = req.params.id;
    const listaUsuarios = await pool.query('SELECT * FROM usuario');

    res.render('MiperfilResumen', {
        usuario: req.user
    });
});

router.post('/cambiarimg', (req, res) => {
    const id = req.user.ID_Usuario;
    const image = req.body.img;
    pool.query(`UPDATE usuario SET img='${image}' WHERE ID_Usuario= ${id}`)
    var us2 = buscar_id(listaUsuarios, id);
    res.redirect('/MiperfilResumen', {
        usuario: req.user
    });
});

router.post('/MiPerfil-Resumen', async(req, res) => {
    const id = req.user.ID_Usuario;

    var nuevoUsername = req.body.usuario_nombres;
    var telefono = req.body.telefono;
    var area = req.body.area;

    if (area != "Escoge un area") {
        pool.query(`UPDATE usuario SET Username='${nuevoUsername}', Telefono='${telefono}', area='${area}' WHERE ID_Usuario= ${id}`)
        const actualizar = await pool.query('SELECT * FROM usuario');
    }
    res.redirect('/MiPerfil-Resumen')
});
router.get('/MiPerfil-Tienda', isLoggedIn, async(req, res) => {
    const id = req.user.ID_Usuario;
    const libro = await pool.query(`SELECT * from Libro where ID_Usuario = ${id}`);
    const categorias = await pool.query('SELECT * from categorias');
    const estados = await pool.query('SELECT * from estados');
    const usuario = await pool.query('SELECT * from usuario');

    res.render('Miperfilmt', {
        libro: libro,
        categorias: categorias,
        estados: estados,
        usuario: usuario
    });
});


module.exports = router;