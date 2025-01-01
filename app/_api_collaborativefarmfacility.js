const express = require('express')
const constants = require('../config/constant')
const formidable = require('formidable')
const router = express.Router()
const collaborativefarmfacility = require('../models/collaborativefarmfacility')
const facility = require('../models/facility')
const JwtMiddleware = require('../config/Jwt-Middleware')

//  @route                  GET  /api/v2/collaborativefarmfacility/list
//  @desc                   list all collaborativefarmfacilitys
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get collaborativefarmfacility list API called')
  try {
    const collaborativefarmfacilityFound = await collaborativefarmfacility.findAll({
      // include: {
      //    model: herbal,
      //    through: {
      //       model: collaborativefarmfacility
      //    }
      //   },
    })
    if (collaborativefarmfacilityFound) {
      console.log('collaborativefarmfacilityFound in list API: ', collaborativefarmfacilityFound)
      res.status(200).json({
        status: 'ok',
        result: collaborativefarmfacilityFound,
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

//  @route                  GET  /api/v2/collaborativefarmfacility/:id
//  @desc                   Get collaborativefarmfacility by Id
//  @access                 Private
router.get('/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get collaborativefarmfacility by Id API called')
  let id = req.params.id

  try {
    const collaborativefarmfacilityFound = await collaborativefarmfacility.findOne({
      where: { id },
    })

    if (collaborativefarmfacilityFound) {
      // res.status(200).json(collaborativefarmfacilityFound)
      res.status(200).json({
        status: 'ok',
        result: collaborativefarmfacilityFound,
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

//  @route                  POST  /api/v2/collaborativefarmfacility
//  @desc                   Post add collaborativefarmfacility
//  @access                 Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  console.log('collaborativefarmfacility add is called')
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await collaborativefarmfacility.create(fields);
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
