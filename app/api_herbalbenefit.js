const express = require('express')
const router = express.Router()
const herbalbenefit = require('../models/herbalbenefit')
const benefit = require('../models/benefit')
const herbal = require('../models/herbal')

//  @route                  GET  /api/v2/herbalbenefit/list
//  @desc                   list all herbalbenefit
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get herbalbenefit list API called')
  try {
    const herbalbenefitFound = await herbalbenefit.findAll({
      // include: {
      //    model: herbal,
      //    through: {
      //       model: herbalbenefit
      //    }
      //   },
    })
    if (herbalbenefitFound) {
      console.log('herbalbenefitFound in list API: ', herbalbenefitFound)
      res.status(200).json({
        status: 'ok',
        result: herbalbenefitFound,
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

//  @route                  GET  /api/v2/herbalbenefit/:id
//  @desc                   Get herbalbenefit by Id
//  @access                 Private
router.get('/:id', async (req, res) => {
  console.log('get herbalbenefit by Id API called')
  let id = req.params.id

  try {
    const herbalbenefitFound = await herbalbenefit.findOne({
      where: { id },
    })

    if (herbalbenefitFound) {
      // res.status(200).json(herbalbenefitFound)
      res.status(200).json({
        status: 'ok',
        result: herbalbenefitFound,
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
