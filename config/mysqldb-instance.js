const Sequelize = require('sequelize')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'mkherbdb.sqlite',
})

;(async () => {
  await sequelize.authenticate()
})()

module.exports = sequelize
