require('dotenv').config();
const Sequelize = require('sequelize')

const host = process.env.NODE_ENV_DB_HOST;
const dbname = process.env.NODE_ENV_DB_NAME;
const port = process.env.NODE_ENV_DB_PORT;
const password = process.env.NODE_ENV_DB_PASSWORD;

const sequelize = new Sequelize(dbname,'postgres',password,{
  host: host,
  port: port,
  dialect: 'postgres',
})

;(async () => {
  await sequelize.authenticate()
})()

module.exports = sequelize
