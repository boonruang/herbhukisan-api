const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')
const facility = require('./facility')
const farmergroup = require('./farmergroup')

const farmergroupfacility = sequelize.define(
  'farmergroupfacilities',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    farmergroupId: {
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
    tableName: "farmergroupfacilities",
  },
)

farmergroup.belongsToMany(facility,{
  through: {
    model: "farmergroupfacilities",
    unique: false
},
  constraints: false 
})

facility.belongsToMany(farmergroup,{
  through: {
    model: "farmergroupfacilities",
    unique: false
},
  constraints: false 
})


;(async () => {
  await farmergroupfacility.sync({ force: false })
})()

module.exports = farmergroupfacility
