const { Model, Sequelize } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING
        }, {
            sequelize
        })
        return this
    }
}

module.exports = User