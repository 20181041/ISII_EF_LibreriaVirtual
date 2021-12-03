const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const validator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('./keys');

//iniciar  express

const app = express();

require('./lib/passport');

//Configuraciones 
app.set('port', process.env.PORT || 4000);

//Middlewares
app.use(session({
    secret: 'Hipatia',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))

//app.use(validator());
app.use(flash());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Definimos el motor de plantillas
app.set('view engine', 'ejs');




// Publicamos la carpeta Public  configurar path
app.use(express.static('public'));


//Variables globales

app.use((req, res, next) => {
    app.locals.message = req.flash('message');
    app.locals.success = req.flash('success');
    app.locals.user = req.user;
    next();
});



//Rutas 
//Al usar esta funcion activamos las rutas

app.use(require('./routes'));
app.use(require('./routes/autenticar'));
//por ahora comentamos para que no se pare haciendo la conexión con la bd 
app.use(require('./routes/usuario'));
app.use(require('./routes/email'));
app.use(require('./routes/catalogo'));
app.use(require('./routes/libro'));
app.use(require('./routes/transaccion'));
app.use(require('./routes/carrito'));
app.use(require('./routes/Perfil'));


// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server is in port', app.get('port'));
});