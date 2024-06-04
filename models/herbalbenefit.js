const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')
const herbal = require('./herbal')
const benefit = require('./benefit')

const herbalbenefit = sequelize.define(
  'herbalbenefit',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    herbalId: {
      type: Sequelize.INTEGER,
      allowNull: false,         
    },    
    benefitId: {
        type: Sequelize.INTEGER,
        allowNull: false,      
      },
  },
  {
    timestamps: false,
    tableName: "herbalbenefit",
  },
)

benefit.belongsToMany(herbal,{
    through: "herbalbenefit",
  })

herbal.belongsToMany(benefit,{
  through: "herbalbenefit",
})

;(async () => {
  await herbalbenefit.sync({ force: true })
})()

module.exports = herbalbenefit
