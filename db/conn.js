const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('thoughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3307',
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!')
} catch(err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.exports = sequelize