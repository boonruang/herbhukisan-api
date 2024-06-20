const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const farmer = require('../models/farmer')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Op = Sequelize.Op

//  @route                  GET  /api/v2/farmer/list
//  @desc                   list all farmers
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmer API called')
  try {
    const farmerFound = await farmer.findAll({
      order: [
        ['id','ASC']
      ],
    })
    if (farmerFound) {
      console.log('farmerFound in list API: ', farmerFound)
      res.status(200).json({
        status: 'ok',
        result: farmerFound,
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

//  @route                  GET  /api/v2/farmer/select/:id
//  @desc                   Get farmer by Id
//  @access                 Private
router.get('/select/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmer by Id API called')
  let id = req.params.id

  try {
    const farmerFound = await farmer.findOne({
      where: { id },
    })

    if (farmerFound) {
      res.status(200).json({
        status: 'ok',
        result: farmerFound,
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


//  @route                  POST  /api/v2/farmer
//  @desc                   Post add farmer
//  @access                 Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  console.log('farmer add is called')
  
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await farmer.create(fields);
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
