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

router.post('/carrito/:id/:id_libro', async(req, res) => {
    const id = req.params.id;
    const id_libro = req.params.id_libro;
    const listadelibros = await pool.query('SELECT * FROM libro');
    var us1 = buscar_id(listadelibros, id_libro);
    const nuevoLibro = [us1.Nombre, us1.Precio, us1.Autor, us1.Tipo_Transaccion, us1.Imperfectos, us1.Categoria, us1.Estado, `Libro${id_libro}.png` , "Pendiente", id_libro]
    const encontrado = BuscarId(us1.ID_Libro)
    if(!encontrado){
        libroscarrito.push(nuevoLibro);
    }
    librosID.push(us1.ID_Libro)

   res.redirect(`/catalogo/${id}`)

    

});

router.post('/carrito/:id/borrar/', async(req,res) =>{
    const id = req.params.id;
    const id_libro = req.body.idLibro;

    console.log(id_libro)
    console.log(libroscarrito)
    for (let x = 0; x < libroscarrito.length; x++) {
        console.log("Posición carrito"+libroscarrito[x])
        console.log("Libro1 sin for: " + libroscarrito[x][9])
        if (libroscarrito[x][9]== id_libro) {

            console.log("Libro1: " + libroscarrito[x][9])
            console.log("Libro1: " + libroscarrito[x])
            console.log("Libro2: " + id_libro)

           /*libroscarrito.splice(libroscarrito[x],1)
            librosID.splice(librosID[x],1)*/
        } 
   }
  
   res.redirect(`/carrito/${id}`)

});

router.get('/carrito/:id', async (req, res) => {
     var listadelibros = libroscarrito;
     res.render('carrito', {
         LibrosCarrito : listadelibros,
         Id : req.params.id,
         TotalLibros: listadelibros.length
     })
     
 });


module.exports = router;