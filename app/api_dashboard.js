const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')
const herbal = require('../models/herbal')
const farmer = require('../models/farmer')
const farmergroup = require('../models/farmergroup')
const marketplace = require('../models/marketplace')
const Op = Sequelize.Op

//  @route                  GET  /api/v2/dashboard/list
//  @desc                   list all dashboards
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get dashboard API called')
  try {
    const amountHerbal = await herbal.count()
    const amountFarmer = await farmer.count()
    const amountFarmergroup = await farmergroup.count()
    const amountMarketplace = await marketplace.count()
    const total = amountHerbal + amountFarmer + amountFarmergroup + amountMarketplace
    const herbalPercent = amountHerbal / total
    const farmerPercent = amountFarmer / total
    const farmergroupPercent = amountFarmergroup / total
    const marketplacePercent = amountMarketplace / total

    let dashboard = {
      herbal : amountHerbal,
      farmer : amountFarmer,
      farmergroup : amountFarmergroup,
      marketplace : amountMarketplace,
      herbalpercent : herbalPercent.toFixed(2),
      farmerpercent : farmerPercent.toFixed(2),
      farmergrouppercent : farmergroupPercent.toFixed(2),
      marketplacepercent : marketplacePercent.toFixed(2),
    }

    if (dashboard) {
      res.status(200).json({
        status: 'ok',
        result: dashboard,
      })
    } else {
      res.status(500).json({
        status: 'nok',
      })
    }
  } catch (error) {
    res.status(500).json({
      Error: error.toString(),
    })
  }
})

module.exports = router
