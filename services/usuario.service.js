const bcrypt = require('bcryptjs');
const { UsuarioRepository } = require('../repositories/usuario.repository');

class UsuarioService {

    listaUsuario = ({ nome, cpf, is_admin }) => {
        let where = {}

        if (nome)
            where.nome = nome;

        if (cpf)
            where.cpf = cpf;

        if (is_admin)
            where.is_admin = is_admin;

        return UsuarioRepository.Find(where);
    }

    criarUsuario = ({ nome, senha, cpf, is_admin }) => {
        let entity =
        {
            nome,
            senha: bcrypt.hashSync(senha, 10),
            cpf,
            is_admin,
        }

        return UsuarioRepository.Insert(entity);
    }

    atualizarUsuario = (cpf, { nome, senha, is_admin }) => {
        return UsuarioRepository.Update({
            nome,
            senha: bcrypt.hashSync(senha, 10),
            is_admin
        }, {
            cpf
        });
    }

}

const usuarioService = new UsuarioService()

module.exports = { UsuarioService: usuarioService }