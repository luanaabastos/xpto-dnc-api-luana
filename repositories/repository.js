class Repository {
    _dbContext;

    constructor(dbContext) {
        dbContext.sync();
        this._dbContext = dbContext;
    }

    FindOne = (where, include) => {
        return include
            ? this._dbContext.findOne({ where: where, include: include })
            : this._dbContext.findOne({ where: where });
    }

    Find = (where, include) => {
        return include
            ? this._dbContext.findAll({ where: where, include: include })
            : this._dbContext.findAll({ where: where })
    }

    Insert = (entity) => {
        return this._dbContext.create(entity)
    }

    Update = (entity, where) => {
        return this._dbContext.update(entity, { where: where })
    }

    Delete = (where) => {
        return this._dbContext.destroy({ where: where })
    }
}

module.exports = { Repository }