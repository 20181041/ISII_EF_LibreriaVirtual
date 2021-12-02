const pool = require('./database');


var arreglogeneral = [];


/*FUNCIONES GENERALES*/
const BuscarUsuarioxID = async(id) => {
    for (let p in arreglogeneral) {
        if (arreglogeneral[p].id == id) {
            return (arreglogeneral[p])
        }
    }
}

const Añadirnuevo = async(id) => {
    arreglogeneral.push({
        id: id,
        carrito: [],
        tienda: [],
        transaccion: [],
        transaccion2:[]
    })

}

const VerUsuarios = async(id) => {
    console.log(arreglogeneral)
}

const AñadirUsuarios = async () =>{
    const Usuarios = await pool.query('SELECT * from usuario');
    for (let p in Usuarios){
      Añadirnuevo(Usuarios[p].ID_Usuario)
    }
}

/* FUNCIONES GET*/
const GetCarrito = async(id) => {
    const usuario = await BuscarUsuarioxID(id)
    const carrito = usuario.carrito;
    return carrito;
}

const GetTransaccion1 = async(id) => {
    const usuario = await BuscarUsuarioxID(id)
    console.log(usuario)
    const listaTransaccion = usuario.transaccion;
    return listaTransaccion;
}

const GetTransaccion2 = async(id) => {
    const usuario = await BuscarUsuarioxID(id)
    const listaTransaccion = usuario.transaccion2;
    return listaTransaccion;
}



/* FUNCIONES CARRITO*/
const BorrarDelCarrito = async(id, idLibro) => {
    const libroscarrito = await GetCarrito(id);
    for (let x in libroscarrito) {
        if (libroscarrito[x].ID == idLibro) {
            libroscarrito.splice(x, 1)
        }
    }
}

const AñadirAlCarrito = async(id, libro) => {
    const carrito = await GetCarrito(id);
    var encontrado = false;
    for (let i in carrito) {
        if (carrito[i].ID == libro.ID) {
            encontrado = true;
        }
    }
    if (!encontrado) {
        carrito.push(libro)
    }
}
const VerCarrito = async(id) => {
    const carrito = await GetCarrito(id);
    console.log(carrito)
}

/*FUNCIONES TRANSACCION*/
const BuscarLibroxID = async(id) => {
    var us1
    const a = await pool.query('SELECT * FROM libro')
    for (let x = 0; x < a.length; x++) {
        if (a[x].ID_Libro == id) {
            us1 = a[x];
        }
    }
    return us1
}
const AñadirTransaccion = async(Libro, id, idUsuario) => {
    const listaTransaccion = await GetTransaccion1(id)
    const listaTransaccion2 = await GetTransaccion1(idUsuario)
    var encontrado = false;
    for (let i in listaTransaccion) {
        if (listaTransaccion[i].ID_Libro == Libro.ID_Libro) {
            console.log(listaTransaccion[i].ID_Libro)
            console.log(Libro.ID_Libro)
            encontrado = true;
        }
    }

    if (!encontrado) {
        listaTransaccion.push(Libro)
        listaTransaccion2.push(Libro)
    }
}
AñadirUsuarios();
module.exports = {
    arreglogeneral: arreglogeneral,
    BorrarDelCarrito: BorrarDelCarrito,
    BuscarUsuario: BuscarUsuarioxID,
    añadirnuevo: Añadirnuevo,
    vercarrito: VerCarrito,
    añadircarrito: AñadirAlCarrito,
    GetCarrito: GetCarrito,
    GetTransaccion1:GetTransaccion1,
    GetTransaccion2:GetTransaccion2,
    VerUsuarios: VerUsuarios,
    AñadirTransaccion: AñadirTransaccion,
    BuscarLibroxID:BuscarLibroxID
};