const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')

const entrepreneurthaitraditionalmedical = sequelize.define(
  'entrepreneurthaitraditionalmedicals',
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
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },  
    owner: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    member: {
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
    tableName: "entrepreneurthaitraditionalmedicals",
  },
)

;(async () => {
  await entrepreneurthaitraditionalmedical.sync({ force: false })
})()

module.exports = entrepreneurthaitraditionalmedical
