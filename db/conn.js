const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('thoughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3307',
})

try {
    sequelize.authenticate()
    console.log('We connect successfully!')
} catch(err) {
    console.log(`Unable to connect: ${err}`)
}

module.exports = sequelize