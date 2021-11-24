const express = require('express');
const router = express.Router();
const pool = require('../database');

/*const libro1 = ["matilda","30", "Autor1", "Venta", "pág5 sucia", "comedia", "Pendiente", "matilda.png", "Comunicacion"];
const libro2 = ["coquito" ,"10", "Autor2", "Pendiente", "pág5 sucia", "comedia", "Compleato", "coquito.png", "Completado" ];
const libro3 = ["cenicienta","20", "Autor3", "Intercambio", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Comunicacion"  ];
const libro4 = ["floricienta","60", "Autor4", "Pendiente", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Transaccion"  ];
const libro5 = ["5 recetas de pan","10", "Autor5", "Intercambio", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Transaccion"  ];
const libro6 = ["mulan","5", "Autor6", "Venta", "pág5 sucia", "comedia", "Completado", "cenicienta.png", "Completado"  ];
const libro7 = ["10 historias de amor","20", "Autor7", "Pendiente", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Comunicacion"  ];*/
const libro8 = ["zombies","0", "Autor8", "Venta", "pág5 sucia", "comedia", "Pendiente", "cenicienta.png", "Transaccion"  ];
var libroscarrito = [];
var librosID = [];



function buscar_id(a, b) {
    var us1;

    for (let x = 0; x < a.length; x++) {
         if (a[x].ID_Libro == b) {
              us1 = a[x];
         }
    }
    return us1
}

function BuscarId(a){
    for (let x = 0; x < librosID.length; x++){
        if(a==librosID[x]){
            return true
        }
    }
}

router.post('/carrito/:id', async(req, res) => {
    const id = req.params.id;
    const listadelibros = await pool.query('SELECT * FROM libro');
    var us1 = buscar_id(listadelibros, id);
    const nuevoLibro = [us1.Nombre, us1.Precio, us1.Autor, us1.Tipo_Transaccion, us1.Imperfectos, us1.Categoria, us1.Estado, `Libro${id}.png` , "Pendiente", id]
    const encontrado = BuscarId(us1.ID_Libro)
    if(!encontrado){
        libroscarrito.push(nuevoLibro);
    }
    librosID.push(us1.ID_Libro)

   res.redirect('/carrito')
});


router.post('/carrito-borrar', async(req,res) =>{
    const id = req.body.idLibro;
        
    for (let x = 0; x < libroscarrito.length; x++) {
        if (libroscarrito[x][9]== id) {
            libroscarrito.splice(x,1)
            librosID.splice(x,1)
        } 
    }
    
    res.redirect('carrito')
});


router.get('/carrito', async (req, res) => {
     var listadelibros = libroscarrito;
     res.render('carrito', {
         LibrosCarrito : listadelibros,
         Id : req.user.ID_Usuario,
         TotalLibros: listadelibros.length
     })
     
 });


module.exports = router;