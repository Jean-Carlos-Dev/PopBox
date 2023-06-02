const Sequelize = require("sequelize")
const sequelize = new Sequelize("popBox", "root", "86502384",{
    host: "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}