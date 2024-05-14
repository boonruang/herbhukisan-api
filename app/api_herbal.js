const express = require('express')
const router = express.Router()
const herbal = require('../models/herbal')

//  @route                  GET  /api/v2/herbal/list
//  @desc                   list all herbals
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get herbal list API called')
  try {
    const herbalFound = await herbal.findAll()
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

module.exports = router
