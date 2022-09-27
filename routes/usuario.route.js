const express = require('express')
const { HandleError, ForbiddenError } = require('../errors/errors')
const { UsuarioService } = require('../services/usuario.service')
const router = express.Router()
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../services/secret');

router.use(express.json())

router.use(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !(authorization.split && authorization.split(" ").length)) {
        HandleError(new UnauthorizedError("Header Authorization Invalido"), res);
    } else {

        let bearer = authorization.split(" ").pop();

        try {
            req.verifiedUser = await jwt.verify(bearer, SECRET_KEY);
            next();
        } catch (err) {
            HandleError(err, res);
        }
    }

})

router.get('/list', async (req, res) => {
    try {

        const { nome, cpf, is_admin } = req.query;
        const { verifiedUser } = req;
        if (!verifiedUser.is_admin) {
            if (cpf && cpf != verifiedUser.cpf) {
                HandleError(new ForbiddenError('Apenas o Administrador pode consultar terceiros'), res);
                return

            } else {
                cpf = verifiedUser.cpf;
            }
        }

        const usuarios = await UsuarioService.listaUsuario({ nome, cpf, is_admin })

        res.send(
            usuarios.map((usuario) => {
                return {
                    id: usuario.id,
                    nome: usuario.nome,
                    cpf: usuario.cpf,
                    is_admin: usuario.is_admin,
                }
            })
        );

    } catch (err) {
        HandleError(err, res)
    }
})

router.post('/create', async (req, res) => {

    const { verifiedUser } = req;
    if (!verifiedUser.is_admin) {
        HandleError(new ForbiddenError('Apenas o Administrador pode cadastrar usuários'), res);
        return
    }

    try {
        const { nome, senha, cpf, is_admin } = req.




        body;

        const usuario = await UsuarioService.criarUsuario({ nome, senha, cpf, is_admin })
        res.send({ id: usuario.id, cpf: usuario.cpf })

    } catch (err) {
        HandleError(err, res)
    }

})

router.put('/update/:cpf', async (req, res) => {
    const { verifiedUser } = req;
    if (!verifiedUser.is_admin) {
        HandleError(new ForbiddenError('Apenas o Administrador pode editar usuários'), res);
        return
    }

    try {
        const { cpf } = req.params;
        const { nome, senha, is_admin } = req.body;

        await UsuarioService.atualizarUsuario(cpf, { nome, senha, is_admin })
        res.send({ cpf: cpf })

    } catch (err) {
        HandleError(err, res)
    }

})

module.exports = router