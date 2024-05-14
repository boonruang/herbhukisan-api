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


app.use('/api/v2/geoland', require('./api_geoland'))
app.use('/api/v2/geosoil', require('./api_geosoil'))
app.use('/api/v2/geosalt', require('./api_geosalt'))
app.use('/api/v2/marketplace', require('./api_marketplace'))
app.use('/api/v2/farmergroup', require('./api_farmergroup'))
app.use('/api/v2/herbal', require('./api_herbal'))
app.use('/api/v2/user', require('./api_user'))
app.use('/api/v2/auth', require('./api_auth'))
app.use('/api/v2/role', require('./api_role'))

  
const PORT = DEFAULT_PORT

app.listen(PORT, () => {
  console.log('\x1b[36m%s\x1b[0m',`listening on port:${PORT}`)
})