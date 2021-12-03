const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');
const {GetTransaccion1, AñadirTransaccion, GetTransaccion2, BorrarTransaccion, BuscarLibroEnCarrito, BuscarenTransaccion} = require ('../arreglo')
const {GetListaUsuarios, GetCategoria,GetTipoTransaccion, GetEstado } = require ('../Generales');
//const { eq } = require('sequelize/types/lib/operators');


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
    const idP = req.user.ID_Usuario
    const libro = await BuscarLibroEnCarrito(idP, idL)
    AñadirTransaccion(libro, req.user.ID_Usuario, idU)
    console.log(idL)
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


router.post('/ZonaTransaccion', async(req, res) => {
    const id= req.user.ID_Usuario;
    const libro = req.body.IdLibro;
    console.log("ID DEL LIBRO: " + libro)
    const T1 = await GetTransaccion1(id);
    var dueno;
    //var nuevoLibro;

    
    for(let p in T1){
        
        if(T1[p].ID == libro){
            //nuevoLibro = T1[p];
            dueno = T1[p].ID_Usuario ;
        }
    }

    res.render('ZonaTransaccion',{
        peticion: id,
        dueno: dueno,
        libro: libro,
        botonOfertante : false,
        botonRecibe : true,
        botonContinuar: false
    });
});

router.post('/AceptarT', async(req,res) => {
    const libro = req.body.Id_Libro ;
    const peticion = req.body.Id_Peticion;
    const arregloCambio = await GetTransaccion1(peticion) //quien mando la peticion
    const arregloCambio2 = await GetTransaccion2(req.user.ID_Usuario) //tu bandeja de transacciones
    var nuevoLibro;
    console.log(arregloCambio)
    console.log(arregloCambio2)


    for (let p in arregloCambio){
        if(arregloCambio[p].ID == libro){
            //nuevoLibro = arregloCambio[p];
            arregloCambio[p].Zona = "Transaccion";
            arregloCambio[p].AceptadoP = false;
            arregloCambio[p].AceptadoD = false;
            
        }
    }

    for (let p in arregloCambio2){
        if(arregloCambio2[p].ID == libro){
            arregloCambio2[p].Zona = "Transaccion";
            arregloCambio[p].AceptadoP = false;
            arregloCambio[p].AceptadoD = false;
            break;
        }
    }
    res.render('ZonaTransaccion', {
        dueno : req.user.ID_Usuario,
        peticion: peticion,
        libro: libro,
        botonOfertante : true,
        botonRecibe : false,
        botonContinuar: false
    })
});

router.post('/RechazarT',isLoggedIn, async(req,res) => {
    const libro = req.body.Id_Libro ;
    const peticion = req.body.Id_Peticion;
    const arregloCambio = await GetTransaccion1(peticion) //quien mando la peticion
    const arregloCambio2 = await GetTransaccion2(req.user.ID_Usuario) //tu bandeja de transacciones

    console.log(arregloCambio)
    console.log(arregloCambio2)


    for (let p in arregloCambio){
        if(arregloCambio[p].ID == libro){
            arregloCambio[p].Zona = "Cancelado";
            break;
        }
    }

    for (let p in arregloCambio2){
        if(arregloCambio2[p].ID == libro){
            arregloCambio2[p].Zona = "Cancelado";
            break;
        }
    }
    res.redirect("/MiPerfil-Transaccion")
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

router.post('/Confirmar', async(req, res) => {
    const peticion = req.body.peticion
    const dueno = req.body.dueno
    const libro = req.body.libro
    const arregloCambio = await GetTransaccion1(peticion) //quien mando la peticion
    const arregloCambio2 = await GetTransaccion2(dueno) //dueño del libro
    const nuevoLibro = await BuscarenTransaccion(libro,arregloCambio);
   
    const T1 = nuevoLibro.AceptadoD
    const T2 = nuevoLibro.AceptadoP

    if(T1 && T2){
        res.render('ZonaTransaccion', {
            dueno : dueno,
            peticion: peticion,
            libro: libro,
            botonOfertante : false,
            botonRecibe : false,
            botonContinuar: true
        })
    }

    else{
        if(req.user.ID_Usuario==dueno){
            nuevoLibro.AceptadoD=true;
            console.log(typeof(req.user.ID_Usuario))
            console.log(typeof(dueno))
        }
        else if(req.user.ID_Usuario==peticion){
            nuevoLibro.AceptadoP=true;
            console.log(req.user.ID_Usuario)
            console.log(peticion)
        }
    }
 
    console.log(T1)
    console.log(T2)

    /*for(let i in arregloCambio2){

    }
   
    if(nuevolibro.AceptadoD && nuevolibro.AceptadoP){
       
       
    }
    else{
       if(req.user.ID_Usuario==dueno){
            libro.AceptadoD = true;
       }
       else if(req.user.ID_Usuario==peticion){
            libro.AceptadoP = true;

       }
    }*/

    res.redirect('/catalogo')
})

module.exports = router;


