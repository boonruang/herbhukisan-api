const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')
const herbal = require('./herbal')
const farmergroup = require('./farmergroup')

const farmergroupherbal = sequelize.define(
  'farmergroupherbals',
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
    herbalId: {
        type: Sequelize.INTEGER,
        allowNull: false,         
      },
  },
  {
    timestamps: false,
    tableName: "farmergroupherbals",
  },
)

// farmergroup.belongsToMany(herbal,{
//     through: "farmergroupherbals",
//   })

// herbal.belongsToMany(farmergroup,{
//   through: "farmergroupherbals",
// })

farmergroup.belongsToMany(herbal,{
  through: {
    model: "farmergroupherbals",
    unique: false
},
  constraints: false 
})

herbal.belongsToMany(farmergroup,{
  through: {
    model: "farmergroupherbals",
    unique: false
},
  constraints: false 
})


// This work the same.
// farmergroup.belongsToMany(herbal,{
//     through: "farmergroupherbals",
//     foreignKey: { name: 'farmergroupId', allowNull: false}
//   })

// herbal.belongsToMany(farmergroup,{
//   through: "farmergroupherbals",
//   foreignKey: { name: 'herbalId', allowNull: false}
// })

// This idea not working
// farmergroupherbal.associate = () => {
//   herbal.belongsToMany(farmergroup,{
//     through: "farmergroupherbals"
//   })
//   farmergroup.belongsToMany(herbal,{
//     through: "farmergroupherbals"
//   })
// }

;(async () => {
  await farmergroupherbal.sync({ force: false })
})()

module.exports = farmergroupherbal
