const express = require('express')
const router = express.Router()
const character = require('../models/character')
const herbal = require('../models/herbal')

//  @route                  GET  /api/v2/character/list
//  @desc                   list all characters
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get character list API called')
  try {
    const characterFound = await character.findAll({
      // include: {
      //   model: herbal,
      //  },      
    })
    if (characterFound) {
      console.log('characterFound in list API: ', characterFound)
      res.status(200).json({
        status: 'ok',
        result: characterFound,
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

//  @route                  GET  /api/v2/character/list
//  @desc                   list all characters select by Id
//  @access                 Private
router.get('/select/:id',async (req, res) => {
  console.log('get character select by id API called')
  let id = req.params.id
  console.log('id',id)  
  try {
    const characterFound = await character.findOne({
      where : { id },
      include: {
        model: herbal,
      }
    }); 

      if (characterFound) {
        // console.log('characterFound in map', characterFound)
        console.log('characterFound in map')
        res.status(200).json({
          status: 'ok',
          result: characterFound,
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
