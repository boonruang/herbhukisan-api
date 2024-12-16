const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const philosopher = require('../models/philosopher')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Op = Sequelize.Op

//  @route                  GET  /api/v2/philosopher/list
//  @desc                   list all philosophers
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get philosopher API called')
  try {
    const philosopherFound = await philosopher.findAll({
      where: {
        status: { 
           [Op.eq] :  true
          } 
      },
      order: [
        ['id','ASC']
      ],
    })
    if (philosopherFound) {
      console.log('philosopherFound in list API: ', philosopherFound)
      res.status(200).json({
        status: 'ok',
        result: philosopherFound,
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

//  @route                  GET  /api/v2/philosopher/select/:id
//  @desc                   Get philosopher by Id
//  @access                 Private
router.get('/select/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get philosopher by Id API called')
  let id = req.params.id

  try {
    const philosopherFound = await philosopher.findOne({
      where: { id }    
    })

    if (philosopherFound) {
      res.status(200).json({
        status: 'ok',
        result: philosopherFound,
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


//  @route                  POST  /api/v2/philosopher
//  @desc                   Post add philosopher
//  @access                 Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  console.log('philosopher add is called')
  
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await philosopher.create(fields);
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
