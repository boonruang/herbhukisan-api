const express = require('express')
const router = express.Router()
const herbalreference = require('../models/herbalreference')
const property = require('../models/property')
const herbal = require('../models/herbal')

//  @route                  GET  /api/v2/herbalreference/list
//  @desc                   list all herbalreference
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get herbalreference list API called')
  try {
    const herbalreferenceFound = await herbalreference.findAll({
      // include: {
      //    model: herbal,
      //    through: {
      //       model: herbalreference
      //    }
      //   },
    })
    if (herbalreferenceFound) {
      console.log('herbalreferenceFound in list API: ', herbalreferenceFound)
      res.status(200).json({
        status: 'ok',
        result: herbalreferenceFound,
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

//  @route                  GET  /api/v2/herbalreference/:id
//  @desc                   Get herbalreference by Id
//  @access                 Private
router.get('/:id', async (req, res) => {
  console.log('get herbalreference by Id API called')
  let id = req.params.id

  try {
    const herbalreferenceFound = await herbalreference.findOne({
      where: { id },
    })

    if (herbalreferenceFound) {
      // res.status(200).json(herbalreferenceFound)
      res.status(200).json({
        status: 'ok',
        result: herbalreferenceFound,
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
