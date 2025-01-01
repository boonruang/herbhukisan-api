const express = require('express')
const router = express.Router()
const facility = require('../models/facility')
const constants = require('../config/constant')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const JwtConfig = require('../config/Jwt-Config')
const JwtMiddleware = require('../config/Jwt-Middleware')

//  @route                  POST  /api/v2/facility
//  @desc                   Add facility
//  @access                 Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  try {
    let result = await facility.create(req.body)
    res.json({ result: constants.kResultOk, message: result })
  } catch (error) {
    res.json({ result: constants.kResultNok, message: error })
  }
})

//  @route                  GET  /api/v2/facility/list
//  @desc                   list all facilitys
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  const facilityFound = await facility.findAll()
  if (facilityFound) {
    res.status(200).json({
      status: 'ok',
      result: facilityFound,
    })
  } else {
    res.status(500).json({
      status: 'nok',
    })
  }
})

//  @route                  GET  /api/v2/facility/:id
//  @desc                   Get mock info
//  @access                 Private

router.get('/:id', JwtMiddleware.checkToken, async (req, res) => {
  let id = req.params.id

  try {
    const facilityFound = await facility.findOne({ where: { id } })

    if (facilityFound) {
      res.status(200).json(facilityFound)
    } else {
      res.status(500).json({
        result: 'id not found',
      })
    }
  } catch (error) {
    res.status(500).json({
      error,
    })
  }
})

module.exports = router
