const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../lib/auth');
// SINGIN
router.get('/Iniciarsesion', (req, res) => {
  res.render('Iniciarsesion');
});







router.post('/Iniciarsesion', (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/catalogo',
    failureRedirect: '/Iniciarsesion',
    failureFlash: true
  })(req, res, next);
});



module.exports = router;