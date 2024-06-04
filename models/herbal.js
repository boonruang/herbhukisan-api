const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')

const herbal = sequelize.define(
  'herbals',
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    herbalname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    commonname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    scientificname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    akaname: {
      type: Sequelize.STRING,
      allowNull: false,
    },        
    cover : {
      type: Sequelize.STRING,
      allowNull: false,
    },        
  },
  {
    timestamps: false,
  },
)

// herbal.associate = (models) => {
//   herbal.belongsToMany(models.farmergroup,{
//     through: "farmergroupherbals"
//   })
// }

;(async () => {
  await herbal.sync({ force: true })
})()

module.exports = herbal
