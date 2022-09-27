
const { SECRET_KEY } = require("./secret");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require("../errors/errors");
const { UsuarioRepository } = require("../repositories/usuario.repository");

let {
    ROOT_USER,
    ROOT_PASS,
} = process.env;

ROOT_USER = ROOT_USER ?? 11122233344
ROOT_PASS = ROOT_PASS ?? 'Teste123@'

class AuthService {

    login = async ({ cpf, senha }) => {

        if (cpf == ROOT_USER && senha == ROOT_PASS) {
            return jwt.sign({
                is_admin: true,
            }, SECRET_KEY);
        }

        const userInstance = await UsuarioRepository.FindOne({ cpf });

        if (!userInstance)
            throw new UnauthorizedError("CPF não encontrado");

        const senhaConfere = await bcrypt.compare(senha, userInstance.senha);

        if (!senhaConfere)
            throw new UnauthorizedError("Senha não confere");

        return jwt.sign({
            id: userInstance.id,
            cpf: userInstance.cpf,
            is_admin: userInstance.is_admin,
        }, SECRET_KEY);

    }
}

const authService = new AuthService()

module.exports = { AuthService: authService }