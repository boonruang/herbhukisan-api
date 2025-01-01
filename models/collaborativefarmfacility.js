const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')
const facility = require('./facility')
const collaborativefarm = require('./collaborativefarm')

const collaborativefarmfacility = sequelize.define(
  'collaborativefarmfacilities',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    collaborativefarmId: {
        type: Sequelize.INTEGER,
        allowNull: false,      
      },
    facilityId: {
        type: Sequelize.INTEGER,
        allowNull: false,         
      },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },        
  },
  {
    timestamps: false,
    tableName: "collaborativefarmfacilities",
  },
)

collaborativefarm.belongsToMany(facility,{
  through: {
    model: "collaborativefarmfacilities",
    unique: false
},
  constraints: false 
})

facility.belongsToMany(collaborativefarm,{
  through: {
    model: "collaborativefarmfacilities",
    unique: false
},
  constraints: false 
})


;(async () => {
  await collaborativefarmfacility.sync({ force: false })
})()

module.exports = collaborativefarmfacility
