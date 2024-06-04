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
    no: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    moo: {
      type: Sequelize.STRING,
      allowNull: false,
    },     
    village : {
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
      allowNull: true,
    },
    leader: {
      type: Sequelize.STRING,
      allowNull: true,
    },    
    cert: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    member: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    area: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },    
    image : {
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
    timestamps: false,
    tableName: "farmergroup",
  },
)

// farmergroup.associate = (models) => {
//   farmergroup.belongsToMany(models.herbal,{
//     through: "farmergroupherbals"
//   })
// }
  
;(async () => {
  await farmergroup.sync({ force: false })
})()

module.exports = farmergroup
