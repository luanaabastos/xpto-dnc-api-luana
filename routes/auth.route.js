const express = require('express');
const { HandleError } = require('../errors/errors');
const { AuthService } = require('../services/auth.service');
const router = express.Router()

router.use(express.json())

router.post('/', async (req, res) => {

    try {

        const { cpf, senha } = req.body;
        const bearer = await AuthService.login({ cpf, senha });

        res.send({ bearer })

    } catch (err) {
        HandleError(err, res)
    }
})

module.exports = router
