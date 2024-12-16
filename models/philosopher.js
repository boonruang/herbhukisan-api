const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')

const philosopher = sequelize.define(
  'philosophers',
  {
    // attributes
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
    baan: {
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
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },  
    knowledge: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    course: {
      type: Sequelize.STRING,
      allowNull: true,
    },              
    reference: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    photo: {
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
    tableName: "philosophers",
  },
)

;(async () => {
  await philosopher.sync({ force: false })
})()

module.exports = philosopher
