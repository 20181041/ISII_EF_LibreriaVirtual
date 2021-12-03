const pool = require('./database');

const GetListaLibros = async() => {
    const listalibros = await pool.query('SELECT * FROM libro')
    return listalibros
}

const BuscarLibroxID = async(id) => {
    var us1
    const a = await GetListaLibros();
    for (let x = 0; x < a.length; x++) {
        if (a[x].ID_Libro == id) {
            us1 = a[x];
        }
    }
    return us1
}
const GetListaUsuarios = async() => {
    const listausuarios = await pool.query('SELECT * FROM usuario')
    return listausuarios
}

const BuscarUsuarioxID = async(id) => {
    const listausuarios = await GetListaUsuarios();
    for (let p in listausuarios) {
        if (listausuarios[p].id == id) {
            return (listausuarios[p])
        }
    }
}

const GetCategoria = async() => {
    const categorias = await pool.query('SELECT * FROM categorias')
    return categorias
}

const GetEstado = async() => {
    const estado = await pool.query('SELECT * from estados')
    return estado
}

const GetTipoTransaccion = async() => {
    const tipo_transaccion = await pool.query('SELECT * from tipo_transaccion')
    return tipo_transaccion
}
const GetAreas = async() => {
    const areas = await pool.query('SELECT * from areas')
    return areas
}

module.exports = {
    GetListaLibros: GetListaLibros,
    GetListaUsuarios: GetListaUsuarios,
    BuscarLibroxID: BuscarLibroxID,
    BuscarUsuarioxID: BuscarUsuarioxID,
    GetEstado: GetEstado,
    GetAreas: GetAreas,
    GetTipoTransaccion: GetTipoTransaccion,
    GetCategoria: GetCategoria
}