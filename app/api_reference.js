const express = require('express')
const constants = require('../config/constant')
const formidable = require('formidable')
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

//  @route                  POST  /api/v2/reference
//  @desc                   Post add reference
//  @access                 Private
router.post('/', async (req, res) => {
  console.log('reference add is called')
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await reference.create(fields);
      // result = await uploadImage(files, result);
      console.log('req fields',fields)

      res.json({
        result: constants.kResultOk,
        message: JSON.stringify(result)
      });
    });
  } catch (error) {
    res.json({
      result: constants.kResultNok,
      message: JSON.stringify(error)
    });
  }
});

module.exports = router