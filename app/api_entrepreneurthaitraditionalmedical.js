const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const entrepreneurthaitraditionalmedical = require('../models/entrepreneurthaitraditionalmedical')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Op = Sequelize.Op

//  @route                  GET  /api/v2/entrepreneurthaitraditionalmedical/list
//  @desc                   list all entrepreneurthaitraditionalmedicals
//  @access                 public
router.get('/list',async (req, res) => {
  console.log('get entrepreneurthaitraditionalmedical API called')
  try {
    const entrepreneurthaitraditionalmedicalFound = await entrepreneurthaitraditionalmedical.findAll({
      where: {
              status: {[Op.eq] : true }
      },
      order: [
        ['id','ASC']
      ],
    })
    if (entrepreneurthaitraditionalmedicalFound) {
      console.log('entrepreneurthaitraditionalmedicalFound in list API: ', entrepreneurthaitraditionalmedicalFound)
      res.status(200).json({
        status: 'ok',
        result: entrepreneurthaitraditionalmedicalFound,
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

//  @route                  GET  /api/v2/entrepreneurthaitraditionalmedical/list
//  @desc                   list all entrepreneurthaitraditionalmedicals
//  @access                 public
router.get('/province/:searchText',async (req, res) => {
  console.log('get entrepreneurthaitraditionalmedical API called')
  let SearchText = req.params.searchText
  try {
    const entrepreneurthaitraditionalmedicalFound = await entrepreneurthaitraditionalmedical.findAll({
      where: {
        [Op.and]: [
          {
              status: {[Op.eq] : true }
          }, 
          {        
              province: { [Op.eq]: SearchText }
          },
        ]
      },
      order: [
        ['id','ASC']
      ],
    })
    if (entrepreneurthaitraditionalmedicalFound) {
      console.log('entrepreneurthaitraditionalmedicalFound in list API: ', entrepreneurthaitraditionalmedicalFound)
      res.status(200).json({
        status: 'ok',
        result: entrepreneurthaitraditionalmedicalFound,
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

//  @route                  GET  /api/v2/entrepreneurthaitraditionalmedical/select/:id
//  @desc                   Get entrepreneurthaitraditionalmedical by Id
//  @access                 Private
router.get('/select/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get entrepreneurthaitraditionalmedical by Id API called')
  let id = req.params.id

  try {
    const entrepreneurthaitraditionalmedicalFound = await entrepreneurthaitraditionalmedical.findOne({
      where: { id }    
    })

    if (entrepreneurthaitraditionalmedicalFound) {
      res.status(200).json({
        status: 'ok',
        result: entrepreneurthaitraditionalmedicalFound,
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


//  @route                  POST  /api/v2/entrepreneurthaitraditionalmedical
//  @desc                   Post add entrepreneurthaitraditionalmedical
//  @access                 Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  console.log('entrepreneurthaitraditionalmedical add is called')
  
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await entrepreneurthaitraditionalmedical.create(fields);
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
