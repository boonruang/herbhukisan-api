const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const entrepreneurherbal = require('../models/entrepreneurherbal')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Op = Sequelize.Op

//  @route                  GET  /api/v2/entrepreneurherbal/list
//  @desc                   list all entrepreneurherbals
//  @access                 public
router.get('/list',async (req, res) => {
  console.log('get entrepreneurherbal API called')
  try {
    const entrepreneurherbalFound = await entrepreneurherbal.findAll({
      where: {
              status: {[Op.eq] : true }
      },
      order: [
        ['id','ASC']
      ],
    })
    if (entrepreneurherbalFound) {
      console.log('entrepreneurherbalFound in list API: ', entrepreneurherbalFound)
      res.status(200).json({
        status: 'ok',
        result: entrepreneurherbalFound,
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

//  @route                  GET  /api/v2/entrepreneurherbal/list
//  @desc                   list all entrepreneurherbals
//  @access                 public
router.get('/province/:searchText',async (req, res) => {
  console.log('get entrepreneurherbal API called')
  let SearchText = req.params.searchText
  try {
    const entrepreneurherbalFound = await entrepreneurherbal.findAll({
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
    if (entrepreneurherbalFound) {
      console.log('entrepreneurherbalFound in list API: ', entrepreneurherbalFound)
      res.status(200).json({
        status: 'ok',
        result: entrepreneurherbalFound,
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

//  @route                  GET  /api/v2/entrepreneurherbal/select/:id
//  @desc                   Get entrepreneurherbal by Id
//  @access                 Private
router.get('/select/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get entrepreneurherbal by Id API called')
  let id = req.params.id

  try {
    const entrepreneurherbalFound = await entrepreneurherbal.findOne({
      where: { id }    
    })

    if (entrepreneurherbalFound) {
      res.status(200).json({
        status: 'ok',
        result: entrepreneurherbalFound,
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


//  @route                  POST  /api/v2/entrepreneurherbal
//  @desc                   Post add entrepreneurherbal
//  @access                 Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  console.log('entrepreneurherbal add is called')
  
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await entrepreneurherbal.create(fields);
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