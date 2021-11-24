const express = require('express');
const { cloudasset } = require('googleapis/build/src/apis/cloudasset');
const router = express.Router();
const passport = require('../lib/passport');
const pool = require('../database');
const helpers = require('../lib/helpers');

const Usuario1 =
{
    id: '1',
    Nombre: 'clau',
    Apellido: 'martinez',
    Departamento: 'ciene',
    Telefono: '998456780'
};

const Usuario2 =
{
    id: '2',
    Nombre: 'alejo',
    Apellido: 'anci',
    Departamento: 'ate',
    Telefono: '967568912'
};


const Usuario3 =
{
    id: '3',
    Nombre: 'andrea',
    Apellido: 'lira',
    Departamento: 'surco',
    Telefono: '956789123'
};

const listaUsuarios = [Usuario1, Usuario2, Usuario3]

router.get('/', async (req, res) => {
    res.render('ejemplo');
});


router.get('/Iniciarsesion', async (req, res) => {
    res.render('Iniciarsesion');
});


router.get('/logout', (req, res) => {
    req.logOut();
    res.render('Iniciarsesion');
  });



module.exports = router;