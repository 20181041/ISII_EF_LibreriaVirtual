const express = require('express');
const router = express.Router();
const pool = require('../database');
const { arreglogeneral, añadircarrito, GetCarrito, BorrarDelCarrito } = require('../arreglo')

/*const libro1 = ["matilda","30", "Autor1", "Venta", "pág5 sucia", "comedia", "Pendiente", "matilda.png", "Comunicacion"];
const libro2 = ["coquito" ,"10", "Autor2", "Pendiente", "pág5 sucia", "comedia", "Compleato", "coquito.png", "Completado" ];
const libro3 = ["cenicienta","20", "Autor3", "Intercambio", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Comunicacion"  ];
const libro4 = ["floricienta","60", "Autor4", "Pendiente", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Transaccion"  ];
const libro5 = ["5 recetas de pan","10", "Autor5", "Intercambio", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Transaccion"  ];
const libro6 = ["mulan","5", "Autor6", "Venta", "pág5 sucia", "comedia", "Completado", "cenicienta.png", "Completado"  ];
const libro7 = ["10 historias de amor","20", "Autor7", "Pendiente", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Comunicacion"  ];*/
const libro8 = ["zombies", "0", "Autor8", "Venta", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Transaccion"];

//console.log(arreglogeneral)

function buscar_id(a, b) {
    var us1;

    for (let x = 0; x < a.length; x++) {
        if (a[x].ID_Libro == b) {
            us1 = a[x];
        }
    }
    return us1
}

router.post('/carrito/:id', async(req, res) => {
    //var libroscarrito = getCarrito();
    //var librosID = getLibrosID();
    const id = req.params.id;
    const listadelibros = await pool.query('SELECT * FROM libro');
    var us1 = buscar_id(listadelibros, id);
    const nuevoLibro = {
         Nombre: us1.Nombre,
         Precio: us1.Precio, 
         Autor: us1.Autor, 
         T_Transaccion: us1.Tipo_Transaccion, 
         Imperfectos: us1.Imperfectos, 
         Categoria: us1.Categoria, 
         Estado : us1.Estado, 
         Imagen: `Libro${id}.png` , 
         Zona: "Transaccion",
         ID: id};

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