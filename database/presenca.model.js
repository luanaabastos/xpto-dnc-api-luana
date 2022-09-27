const { DataTypes } = require("sequelize");
const { DbContext } = require("./db-context");
const { Usuario } = require("./usuario.model");

const Presenca = DbContext.define("Presenca", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    data_presenca: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    timestamps: false
});

Presenca.belongsTo(Usuario, { foreignKey: 'usuario_id' })

module.exports = { Presenca };
