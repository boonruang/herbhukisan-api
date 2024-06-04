const express = require('express')
const router = express.Router()
const herbalcharacter = require('../models/herbalcharacter')
const character = require('../models/character')
const herbal = require('../models/herbal')

//  @route                  GET  /api/v2/herbalcharacter/list
//  @desc                   list all herbalcharacter
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get herbalcharacter list API called')
  try {
    const herbalcharacterFound = await herbalcharacter.findAll({
      // include: {
      //    model: herbal,
      //    through: {
      //       model: herbalcharacter
      //    }
      //   },
    })
    if (herbalcharacterFound) {
      console.log('herbalcharacterFound in list API: ', herbalcharacterFound)
      res.status(200).json({
        status: 'ok',
        result: herbalcharacterFound,
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

//  @route                  GET  /api/v2/herbalcharacter/:id
//  @desc                   Get herbalcharacter by Id
//  @access                 Private
router.get('/:id', async (req, res) => {
  console.log('get herbalcharacter by Id API called')
  let id = req.params.id

  try {
    const herbalcharacterFound = await herbalcharacter.findOne({
      where: { id },
    })

    if (herbalcharacterFound) {
      // res.status(200).json(herbalcharacterFound)
      res.status(200).json({
        status: 'ok',
        result: herbalcharacterFound,
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
