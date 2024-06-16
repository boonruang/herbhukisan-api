const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express()

const DEFAULT_PORT = process.env.NODE_ENV_SERVICE_PORT

app.use(cors())

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const role = require('../models/role')
const user = require('../models/user')

user.belongsTo(role)

app.use('/api/v2/price', require('./api_price'))
app.use('/api/v2/geoland', require('./api_geoland'))
app.use('/api/v2/geosoil', require('./api_geosoil'))
app.use('/api/v2/geosalt', require('./api_geosalt'))
app.use('/api/v2/marketplace', require('./api_marketplace'))
app.use('/api/v2/herbal', require('./api_herbal'))
app.use('/api/v2/farmer', require('./api_farmer'))
app.use('/api/v2/farmergroup', require('./api_farmergroup'))
app.use('/api/v2/farmergroupherbal', require('./api_farmergroupherbal'))
app.use('/api/v2/property', require('./api_property'))
app.use('/api/v2/herbalproperty', require('./api_herbalproperty'))
app.use('/api/v2/character', require('./api_character'))
app.use('/api/v2/herbalcharacter', require('./api_herbalcharacter'))
app.use('/api/v2/benefit', require('./api_benefit'))
app.use('/api/v2/herbalbenefit', require('./api_herbalbenefit'))
app.use('/api/v2/reference', require('./api_reference'))
app.use('/api/v2/herbalreference', require('./api_herbalreference'))
app.use('/api/v2/nutrition', require('./api_nutrition'))
app.use('/api/v2/herbalnutrition', require('./api_herbalnutrition'))
app.use('/api/v2/user', require('./api_user'))
app.use('/api/v2/auth', require('./api_auth'))
app.use('/api/v2/role', require('./api_role'))

  
const PORT = DEFAULT_PORT

app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m',`listening on port:${PORT}`)
})