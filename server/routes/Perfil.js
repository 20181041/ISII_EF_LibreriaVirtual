const express = require('express');
const router = express.Router();
const pool = require('../database');

function buscar_id(a, b){
     var us1;
     
     for(let x = 0; x < a.length; x++){
         if(a[x].ID_Usuario == b){
             us1 = a[x];
         }
     }
     return us1
}

router.get('/MiPerfil-Editar/:id', async (req, res) => {

     const id = req.params.id;
     const listaUsuarios = await pool.query('SELECT * FROM usuario');
     var us1 = buscar_id(listaUsuarios, id);
     const listaAreas = await pool.query('SELECT Descripcion FROM areas');

     const ListaAreasArray= [];

     for(let x = 0; x < listaAreas.length; x++){
          ListaAreasArray.push(listaAreas[x].Descripcion)
     }

     for (let x= 0; x < ListaAreasArray.length; x++){
          
          if(ListaAreasArray[x]==us1.area){
               ListaAreasArray.splice(x, 1);
          }
     }

     for(let x= 0; x < listaUsuarios.length; x++){
          console.log(listaUsuarios[x].area)
     }

     res.render('MiPerfilEditar', {
          usuario : us1,
          ListaAreas: ListaAreasArray 
     });
 });

 router.get('/MiPerfil-Resumen/:id', async (req, res) => {

    const id = req.params.id;
    const listaUsuarios = await pool.query('SELECT * FROM usuario');
    var us2 = buscar_id(listaUsuarios, id);
    
    res.render('MiperfilResumen', {
         usuario : us2
    });
});

 router.post('/MiPerfil-Resumen/:id', async (req, res)=>{
    const id = req.params.id;

    var nuevoUsername = req.body.usuario_nombres;
    var telefono = req.body.telefono;
    var area = req.body.area;

    if(area!="Escoge un area"){
     pool.query(`UPDATE usuario SET Username='${nuevoUsername}', Telefono='${telefono}', area='${area}' WHERE ID_Usuario= ${id}`)
     const actualizar = await pool.query('SELECT * FROM usuario');
    }
    res.redirect(`${id}`)
 });

 module.exports = router;
 