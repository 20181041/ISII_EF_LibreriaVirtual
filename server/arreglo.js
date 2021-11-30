var arreglogeneral = [];
arreglogeneral.push({
     id: 1,
     carrito: [],
     tienda: [],
     transaccion: []
})
arreglogeneral.push({
     id: 2,
     carrito: [],
     tienda: [],
     transaccion: []
})

const GetCarrito= async(id) => {
     const usuario = await BuscarUsuarioxID(id)
     const carrito = usuario.carrito;
     return carrito;
}
const BuscarUsuarioxID = async(id) => {
    //console.log(arreglogeneral)
     for(let p in arreglogeneral){
          if(arreglogeneral[p].id == id){
               return(arreglogeneral[p])
          }
     }
}

const Añadirnuevo = async(id) => {
     arreglogeneral.push({
          id: id,
          carrito: [],
          tienda: [],
          transaccion: []
     }) 

}

const AñadirAlCarrito = async(id, libro) => {
     const carrito = await GetCarrito(id);
     var encontrado = false;
     for (let i in carrito){
          if(carrito[i].ID==libro.ID){
               encontrado = true;
          }
     }
     if(!encontrado){
          carrito.push(libro)
     }
    
}

const BorrarDelCarrito = async(id, idLibro) =>{
     const libroscarrito = await GetCarrito(id);
     for (let x in libroscarrito) {
          if (libroscarrito[x].ID==idLibro) {
               libroscarrito.splice(x,1)
          } 
      }
}

const VerCarrito = async(id) => {
     const carrito = await GetCarrito(id);
     console.log(carrito)
}

module.exports = {
     arreglogeneral : arreglogeneral,
     BorrarDelCarrito : BorrarDelCarrito,
     BuscarUsuario : BuscarUsuarioxID,
     añadirnuevo : Añadirnuevo,
     vercarrito : VerCarrito,
     añadircarrito : AñadirAlCarrito,
     GetCarrito: GetCarrito
};