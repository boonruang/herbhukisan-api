const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')

const entrepreneurherbal = sequelize.define(
  'entrepreneurherbals',
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    service_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },    
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },    
    hno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    moo: {
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
    brand: {
      type: Sequelize.STRING,
      allowNull: false,
    },       
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },  
    source: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    product_type: {
      type: Sequelize.STRING,
      allowNull: true,
    },              
    herbals: {
      type: Sequelize.STRING,
      allowNull: true,
    },              
    standard: {
      type: Sequelize.STRING,
      allowNull: true,
    },              
    reference: {
      type: Sequelize.STRING,
      allowNull: true,
    },   
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    }      
  },
  {
    timestamps: false,
    tableName: "entrepreneurherbals",
  },
)

;(async () => {
  await entrepreneurherbal.sync({ force: false })
})()

module.exports = entrepreneurherbal
