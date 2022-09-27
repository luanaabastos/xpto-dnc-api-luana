const { Presenca } = require("../database/presenca.model")
const { Repository } = require("./repository")

class PresencaRepository extends Repository {
    constructor() {
        super(Presenca)
    }
}

const _presencaRepository = new PresencaRepository()

module.exports = { PresencaRepository: _presencaRepository }