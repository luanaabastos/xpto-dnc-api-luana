const express = require('express')
const { HandleError, ForbiddenError } = require('../errors/errors')
const { PresencaService } = require('../services/presenca.service')
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

        const { from_data_presenca, to_data_presenca, data_presenca, cpf } = req.query;

        const { verifiedUser } = req;
        if (!verifiedUser.is_admin) {
            if (cpf && cpf != verifiedUser.cpf) {
                HandleError(new ForbiddenError('Usuário sem acesso a presenca de terceiros'), res);
                return
            } else {
                cpf = verifiedUser.cpf;
            }
        }

        const presencas = await PresencaService.listaPresenca({ from_data_presenca, to_data_presenca, data_presenca, cpf });

        res.send(
            presencas.map(presenca => {
                return {
                    id: presenca.id,
                    data_presenca: presenca.data_presenca,
                    usuario_id: presenca.usuario_id,
                    usuario_cpf: presenca.Usuario
                        ? presenca.Usuario.cpf
                        : cpf
                }
            })
        );

    } catch (err) {
        HandleError(err, res);
    }
})

router.post('/create', async (req, res) => {
    try {

        const { data_presenca, cpf } = req.body;
        const { verifiedUser } = req;
        if (!verifiedUser.is_admin) {
            if (cpf && cpf != verifiedUser.cpf) {
                HandleError(new ForbiddenError('Usuário não pode inserir presenca para terceiros'), res);
                return
            } else {
                cpf = verifiedUser.cpf;
            }
        }

        const presenca = await PresencaService.criarPresenca({ data_presenca, cpf });
        res.send({ id: presenca.id, data_presenca: presenca.data_presenca });
    } catch (err) {
        HandleError(err, res);
    }
})

router.put('/update/:id', async (req, res) => {
    try {

        const { verifiedUser } = req;
        if (!verifiedUser.is_admin) {
            HandleError(new ForbiddenError('Apenas o Administrador pode editar Presenças'), res);
            return
        }

        const { id } = req.params;
        const { data_presenca } = req.body;
        await PresencaService.atualizarPresenca(id, { data_presenca });
        res.send({ id: id, data_presenca: data_presenca });
    } catch (err) {
        HandleError(err, res);
    }
})

module.exports = router