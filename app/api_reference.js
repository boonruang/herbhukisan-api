const express = require('express')
const router = express.Router()
const reference = require('../models/reference')
const herbal = require('../models/herbal')

//  @route                  GET  /api/v2/reference/list
//  @desc                   list all references
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get reference list API called')
  try {
    const referenceFound = await reference.findAll({
      // include: {
      //   model: herbal,
      //  },      
    })
    if (referenceFound) {
      console.log('referenceFound in list API: ', referenceFound)
      res.status(200).json({
        status: 'ok',
        result: referenceFound,
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

//  @route                  GET  /api/v2/reference/list
//  @desc                   list all references select by Id
//  @access                 Private
router.get('/select/:id',async (req, res) => {
  console.log('get reference select by id API called')
  let id = req.params.id
  console.log('id',id)  
  try {
    const referenceFound = await reference.findOne({
      where : { id },
      include: {
        model: herbal,
      }
    }); 

      if (referenceFound) {
        // console.log('referenceFound in map', referenceFound)
        console.log('referenceFound in map')
        res.status(200).json({
          status: 'ok',
          result: referenceFound,
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
