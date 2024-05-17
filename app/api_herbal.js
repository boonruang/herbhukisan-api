const express = require('express')
const router = express.Router()
const herbal = require('../models/herbal')
const farmergroup = require('../models/farmergroup')

//  @route                  GET  /api/v2/herbal/list
//  @desc                   list all herbals
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get herbal list API called')
  try {
    const herbalFound = await herbal.findAll({
      include: {
        model: farmergroup
      }
    })
    if (herbalFound) {
      console.log('herbalFound in list API: ', herbalFound)
      res.status(200).json({
        status: 'ok',
        result: herbalFound,
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

//  @route                  GET  /api/v2/herbal/:id
//  @desc                   Get herbal by Id
//  @access                 Private
router.get('/:id', async (req, res) => {
  console.log('get herbal by Id API called')
  let id = req.params.id

  try {
    const herbalFound = await herbal.findOne({
      where: { id },
    })

    if (herbalFound) {
      // res.status(200).json(herbalFound)
      res.status(200).json({
        status: 'ok',
        result: herbalFound,
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
