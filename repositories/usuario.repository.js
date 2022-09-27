const { Usuario } = require("../database/usuario.model")
const { Repository } = require("./repository")

class UsuarioRepository extends Repository {
    constructor() {
        super(Usuario)
    }
}

const _usuarioRepository = new UsuarioRepository()

module.exports = { UsuarioRepository: _usuarioRepository }