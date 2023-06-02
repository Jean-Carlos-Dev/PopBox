const { Sequelize } = require("sequelize")
const Bd = require("./Bd")

const usuario = Bd.sequelize.define("usuarios",{
    nome: {
        type: Bd.Sequelize.STRING,
        allowNull: false
    },
    user: {
        type: Bd.Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Bd.Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Bd.Sequelize.STRING,
        allowNull: false
    },
    administrador: {
        type: Bd.Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = usuario