const pool = require('./database');
const {GetListaUsuarios} = require('./Generales')


var arreglogeneral = [];


/*FUNCIONES GENERALES*/


const Añadirnuevo = async(id) => {
    arreglogeneral.push({
        id: id,
        carrito: [],
        tienda: [],
        transaccion: [],
        transaccion2:[]
    })

}

const VerUsuarios = async() => {
    console.log(arreglogeneral)
}

const AñadirUsuarios = async () =>{
    const Usuarios = await GetListaUsuarios();
    for (let p in Usuarios){
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

const BuscarLibroEnCarrito = async(id1, id2)=>{
    const carrito = await GetCarrito(id1);
    for (let p in carrito) {
        if (carrito[p].ID == id2) {
            return (carrito[p])
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
    //console.log(usuario)
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
    console.log(listaTransaccion)
    for (let i in listaTransaccion) {
        if (listaTransaccion[i].ID == Libro.ID) {
            //console.log(listaTransaccion[i].ID)
            //console.log(Libro.ID)
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
const BuscarenTransaccion = async(libro, arregloCambio) =>{
    for(let i in arregloCambio){
        if(arregloCambio[i].ID==libro){
            NuevoLibro = arregloCambio[i]
            return NuevoLibro
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
    BuscarenTransaccion:BuscarenTransaccion,
    GetTransaccion1:GetTransaccion1,
    GetTransaccion2:GetTransaccion2,
    VerUsuarios: VerUsuarios,
    BuscarLibroEnCarrito: BuscarLibroEnCarrito,
    GetTienda:GetTienda,
    AñadirTransaccion: AñadirTransaccion,
};