const express = require('express')
const router = express.Router()
const farmergroupherbal = require('../models/farmergroupherbal')
const farmergroup = require('../models/farmergroup')
const herbal = require('../models/herbal')

//  @route                  GET  /api/v2/farmergroupherbal/list
//  @desc                   list all farmergroupherbals
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get farmergroupherbal list API called')
  try {
    const farmergroupherbalFound = await farmergroupherbal.findAll({
      // include: {
      //    model: herbal,
      //    through: {
      //       model: farmergroupherbal
      //    }
      //   },
    })
    if (farmergroupherbalFound) {
      console.log('farmergroupherbalFound in list API: ', farmergroupherbalFound)
      res.status(200).json({
        status: 'ok',
        result: farmergroupherbalFound,
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

//  @route                  GET  /api/v2/farmergroupherbal/:id
//  @desc                   Get farmergroupherbal by Id
//  @access                 Private
router.get('/:id', async (req, res) => {
  console.log('get farmergroupherbal by Id API called')
  let id = req.params.id

  try {
    const farmergroupherbalFound = await farmergroupherbal.findOne({
      where: { id },
    })

    if (farmergroupherbalFound) {
      // res.status(200).json(farmergroupherbalFound)
      res.status(200).json({
        status: 'ok',
        result: farmergroupherbalFound,
      })
    } else {
      res.status(500).json({
        result: 'not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
})

module.exports = router
