const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  console.log(username);
  console.log(password);
  const rows = await pool.query('SELECT * from usuario WHERE Correo = ?', [username]);
  console.log("el sistema ha recibido los datos", rows);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.Password)
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.Username));
      console.log('logueado');
    } else {
      console.log('F')
      done(null, false, req.flash('message', 'Contraseña incorrecta'));
    }
  } else {
    return done(null, false, req.flash('message', 'El nombre de usuario no existe'));
  }
}));


/*
passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {

  const { fullname } = req.body;
  let newUser = {
    fullname,
    username,
    password
  };
  newUser.password = await helpers.encryptPassword(password);
  // Saving in the Database
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

*/
 
passport.serializeUser((user, done) => {
  done(null, user.ID_Usuario);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM usuario WHERE ID_Usuario = ?', [id]);
  done(null, rows[0]);
});