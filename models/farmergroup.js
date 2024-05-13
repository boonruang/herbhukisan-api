const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')

const farmergroup = sequelize.define(
  'farmergroup',
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    farmergroupname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tambon: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    amphoe: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    province: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    postcode: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    latitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: false
  },
)

;(async () => {
  await farmergroup.sync({ force: false })
})()

module.exports = farmergroup
