const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance');
const farmergroup = require('./farmergroup');
const collaborativefarm = require('./collaborativefarm');

const facility = sequelize.define(
  'facilities',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },  
    description: {
        type: Sequelize.STRING,
        allowNull: true,
      },       
  },
  {
    timestamps: false,
    tableName: "facilities",
  },
)

;(async () => {
  await facility.sync({ force: false })
})()

module.exports = facility
