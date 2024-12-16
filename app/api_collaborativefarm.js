const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const collaborativefarm = require('../models/collaborativefarm')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Op = Sequelize.Op

//  @route                  GET  /api/v2/collaborativefarm/list
//  @desc                   list all collaborativefarms
//  @access                 public
router.get('/list',async (req, res) => {
  console.log('get collaborativefarm API called')
  try {
    const collaborativefarmFound = await collaborativefarm.findAll({
      where: {
        [Op.and]: [
          {
              status: {[Op.eq] : true }
          }, 
          {        
              province: { [Op.any]: ['ขอนแก่น', 'มหาสารคาม', 'ร้อยเอ็ด', 'กาฬสินธุ์'] }
          },
        ]
      },
      order: [
        ['id','ASC']
      ],
    })
    if (collaborativefarmFound) {
      console.log('collaborativefarmFound in list API: ', collaborativefarmFound)
      res.status(200).json({
        status: 'ok',
        result: collaborativefarmFound,
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

//  @route                  GET  /api/v2/collaborativefarm/list
//  @desc                   list all collaborativefarms
//  @access                 public
router.get('/province/:searchText',async (req, res) => {
  console.log('get collaborativefarm API called')
  let SearchText = req.params.searchText
  try {
    const collaborativefarmFound = await collaborativefarm.findAll({
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
    if (collaborativefarmFound) {
      console.log('collaborativefarmFound in list API: ', collaborativefarmFound)
      res.status(200).json({
        status: 'ok',
        result: collaborativefarmFound,
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

//  @route                  GET  /api/v2/collaborativefarm/select/:id
//  @desc                   Get collaborativefarm by Id
//  @access                 Private
router.get('/select/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get collaborativefarm by Id API called')
  let id = req.params.id

  try {
    const collaborativefarmFound = await collaborativefarm.findOne({
      where: { id }    
    })

    if (collaborativefarmFound) {
      res.status(200).json({
        status: 'ok',
        result: collaborativefarmFound,
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


//  @route                  POST  /api/v2/collaborativefarm
//  @desc                   Post add collaborativefarm
//  @access                 Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  console.log('collaborativefarm add is called')
  
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await collaborativefarm.create(fields);
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
