const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const { arreglogeneral, añadircarrito, GetCarrito, BorrarDelCarrito } = require('../arreglo')
const { BuscarLibroxID } = require('../Generales')


router.post('/carrito/:id', isLoggedIn, async(req, res) => {
    const id = req.params.id;
    var us1 = await BuscarLibroxID(id)
    const nuevoLibro = {
         Nombre: us1.Nombre,
         Precio: us1.Precio, 
         Autor: us1.Autor, 
         T_Transaccion: us1.Tipo_Transaccion, 
         Imperfectos: us1.Imperfectos, 
         Categoria: us1.Categoria, 
         Estado : us1.Estado, 
         Imagen: `Libro${id}.png`, 
         Zona: "Pendiente",
         ID: id,
         ID_Usuario: us1.ID_Usuario,
         ID_Peticion: req.user.ID_Usuario
        };

    añadircarrito(req.user.ID_Usuario, nuevoLibro)

    res.redirect('/catalogo')

});


router.post('/carrito-borrar', async(req, res) => {
    const id = req.body.idLibro;
    const usuario_id = req.user.ID_Usuario;
    BorrarDelCarrito(usuario_id, id)
    res.redirect('carrito')
});


router.get('/carrito', async(req, res) => {
    var listadelibros = await GetCarrito(req.user.ID_Usuario);
    res.render('carrito', {
        LibrosCarrito: listadelibros,
        Id: req.user.ID_Usuario,
        TotalLibros: listadelibros.length,
        nombre: req.user.Username
    })
});
module.exports = router;