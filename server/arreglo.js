const pool = require('./database');
const { GetListaUsuarios } = require('./Generales')


var arreglogeneral = [];


/*FUNCIONES GENERALES*/


const Añadirnuevo = async(id) => {
    arreglogeneral.push({
        id: id,
        carrito: [],
        tienda: [],
        transaccion: [],
        transaccion2: []
    })
}

const VerUsuarios = async() => {
    console.log(arreglogeneral)
}

const AñadirUsuarios = async() => {
    const Usuarios = await GetListaUsuarios();
    for (let p in Usuarios) {
        Añadirnuevo(Usuarios[p].ID_Usuario)
    }
}

const BuscarUsuarioEnArreglo = async(id) => {
    for (let p in arreglogeneral) {
        if (arreglogeneral[p].id == id) {
            return (arreglogeneral[p])
        }
    }
}


/* FUNCIONES GET*/
const GetCarrito = async(id) => {
    const usuario = await BuscarUsuarioEnArreglo(id)
    const carrito = usuario.carrito;
    return carrito;
}

const GetTransaccion1 = async(id) => {
    const usuario = await BuscarUsuarioEnArreglo(id)
    console.log(usuario)
    const listaTransaccion = usuario.transaccion;
    return listaTransaccion;
}

const GetTransaccion2 = async(id) => {
    const usuario = await BuscarUsuarioEnArreglo(id)
    const listaTransaccion = usuario.transaccion2;
    return listaTransaccion;
}

const GetTienda = async(id) => {
        const usuario = await BuscarUsuarioEnArreglo(id)
        const tienda = usuario.tienda;
        return tienda;
    }
    // FUNCIONES TIENDA

const AñadirATienda = async(id, libro) => {
        const tienda = await GetTienda(id);
        var encontrado = false;
        for (let i in tienda) {
            if (tienda[i].ID == libro.ID) {
                encontrado = true;
            }
        }
        if (!encontrado) {
            libro.img = "/Images/Libro0.png";
            tienda.push(libro)
        }
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

const AñadirTransaccion = async(Libro, id, idUsuario) => {
    const listaTransaccion = await GetTransaccion1(id)
    const listaTransaccion2 = await GetTransaccion2(idUsuario)
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
const BorrarTransaccion = async(idUsuario, idLibro) => {
    const libroscarrito = await GetTransaccion2(idUsuario);
    for (let x in libroscarrito) {
        if (libroscarrito[x].ID == idLibro) {
            libroscarrito.splice(x, 1)
        }
    }

}
AñadirUsuarios();

module.exports = {
    BorrarTransaccion: BorrarTransaccion,
    arreglogeneral: arreglogeneral,
    BorrarDelCarrito: BorrarDelCarrito,
    añadirnuevo: Añadirnuevo,
    vercarrito: VerCarrito,
    añadircarrito: AñadirAlCarrito,
    GetCarrito: GetCarrito,
    GetTransaccion1: GetTransaccion1,
    GetTransaccion2: GetTransaccion2,
    VerUsuarios: VerUsuarios,
    GetTienda: GetTienda,
    AñadirTransaccion: AñadirTransaccion,
    AñadirATienda: AñadirATienda,
};