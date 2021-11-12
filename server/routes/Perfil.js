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
     
     res.render('Miperfilmt', {
          usuario : us1
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

    var nuevoNombre = req.body.usuario_nombres;
    var telefono = req.body.telefono;
    var departamento = req.body.departamento;

    pool.query(`UPDATE usuario SET Nombre_completo='${nuevoNombre}', Telefono='${telefono}, Departamento=''${departamento}' WHERE ID_Usuario=${id}`)
    res.redirect('MiperfilResumen')
 });

 module.exports = router;
 