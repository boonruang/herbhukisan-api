const express = require('express')
const constants = require('../config/constant')
const formidable = require('formidable')
const router = express.Router()
const farmergroupfacility = require('../models/farmergroupfacility')
const farmergroup = require('../models/farmergroup')
const facility = require('../models/facility')
const JwtMiddleware = require('../config/Jwt-Middleware')

//  @route                  GET  /api/v2/farmergroupfacility/list
//  @desc                   list all farmergroupfacilitys
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmergroupfacility list API called')
  try {
    const farmergroupfacilityFound = await farmergroupfacility.findAll({
      // include: {
      //    model: herbal,
      //    through: {
      //       model: farmergroupfacility
      //    }
      //   },
    })
    if (farmergroupfacilityFound) {
      console.log('farmergroupfacilityFound in list API: ', farmergroupfacilityFound)
      res.status(200).json({
        status: 'ok',
        result: farmergroupfacilityFound,
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

//  @route                  GET  /api/v2/farmergroupfacility/:id
//  @desc                   Get farmergroupfacility by Id
//  @access                 Private
router.get('/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmergroupfacility by Id API called')
  let id = req.params.id

  try {
    const farmergroupfacilityFound = await farmergroupfacility.findOne({
      where: { id },
    })

    if (farmergroupfacilityFound) {
      // res.status(200).json(farmergroupfacilityFound)
      res.status(200).json({
        status: 'ok',
        result: farmergroupfacilityFound,
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

//  @route                  POST  /api/v2/farmergroupfacility
//  @desc                   Post add farmergroupfacility
//  @access                 Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  console.log('farmergroupfacility add is called')
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await farmergroupfacility.create(fields);
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
