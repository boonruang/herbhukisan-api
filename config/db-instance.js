const Sequelize = require('sequelize')
const sequelize = new Sequelize('mkherbal','postgres','89632100',{
  host: 'localhost',
  port: '5432',
  dialect: 'postgres',
})

;(async () => {
  await sequelize.authenticate()
})()

module.exports = sequelize
