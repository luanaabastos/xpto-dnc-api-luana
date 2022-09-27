const moment = require("moment/moment");
const { Op } = require("sequelize");
const { Usuario } = require("../database/usuario.model");
const { BadRequestError } = require("../errors/errors");
const { PresencaRepository } = require("../repositories/presenca.repository");
const { UsuarioRepository } = require("../repositories/usuario.repository");


class PresencaService {

    listaPresenca = async ({ from_data_presenca, to_data_presenca, data_presenca, cpf }) => {
        let where = {}
        
        if (data_presenca) {
            where.data_presenca = moment(data_presenca).toISOString();
        } else {
            
            if (from_data_presenca)
                where.data_presenca = {
                    [Op.gte]: moment(from_data_presenca).toISOString()
                };

            if (to_data_presenca)
                where.data_presenca = {
                    ...where.data_presenca,
                    [Op.lte]: moment(to_data_presenca).toISOString()
                };
        }

        if (cpf) {
            const userInstance = await UsuarioRepository.FindOne({ cpf });
            where.usuario_id = userInstance.id;
        }

        return PresencaRepository.Find(where, Usuario);

    }

    criarPresenca = async ({ data_presenca, cpf }) => {
        const userInstance = await UsuarioRepository.FindOne({ cpf });

        if (!userInstance)
            throw new BadRequestError("CPF não encontrado");

        let entity = {
            data_presenca,
            usuario_id: userInstance.id,
        }

        return PresencaRepository.Insert(entity);

    }

    atualizarPresenca = async (presencaId, { data_presenca }) => {
        return PresencaRepository.Update({
            data_presenca,
        }, {
            id: presencaId
        });
    }

}

const presencaService = new PresencaService()

module.exports = { PresencaService: presencaService }