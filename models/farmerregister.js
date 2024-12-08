const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')

const farmerregister = sequelize.define(
  'farmerregisters',
  {
    // attributes
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cid: {
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
    tel: {
      type: Sequelize.STRING,
      allowNull: true,
    },    
    cert: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cert_date: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cert_expire_date: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },   
    reset: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },       
    reject: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },     
  },
  {
    timestamps: false,
    tableName: "farmerregisters",
  },
)

;(async () => {
  await farmerregister.sync({ force: false })
})()

module.exports = farmerregister
