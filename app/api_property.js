const express = require('express')
const router = express.Router()
const property = require('../models/property')
const herbal = require('../models/herbal')

//  @route                  GET  /api/v2/property/list
//  @desc                   list all propertys
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get property list API called')
  try {
    const propertyFound = await property.findAll({
      // include: {
      //   model: herbal,
      //  },      
    })
    if (propertyFound) {
      console.log('propertyFound in list API: ', propertyFound)
      res.status(200).json({
        status: 'ok',
        result: propertyFound,
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

//  @route                  GET  /api/v2/property/list
//  @desc                   list all propertys select by Id
//  @access                 Private
router.get('/select/:id',async (req, res) => {
  console.log('get property select by id API called')
  let id = req.params.id
  console.log('id',id)  
  try {
    const propertyFound = await property.findOne({
      where : { id },
      include: {
        model: herbal,
      }
    }); 

      if (propertyFound) {
        // console.log('propertyFound in map', propertyFound)
        console.log('propertyFound in map')
        res.status(200).json({
          status: 'ok',
          result: propertyFound,
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
