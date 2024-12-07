const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const farmer = require('../models/farmer')
const farmerlog = require('../models/farmerlog')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Op = Sequelize.Op

//  @route                  GET  /api/v2/farmer/list
//  @desc                   list all farmers
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmer API called')
  try {
    const farmerFound = await farmer.findAll({
      where: {
        status: { 
           [Op.eq] :  true
          } 
      },
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
      where: { id }    
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

//  @route                  GET  /api/v2/farmer/status
//  @desc                   Get farmer 
//  @access                 Private
router.get('/status', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmer status API called')

  try {
    const farmerFound = await farmer.findAll({
      where: {
        [Op.and]: [
          {
              status: 
              {
                  [Op.eq] : false
              }
          }, 
          {
              reject: 
              {
                [Op.eq] : false
              }
          }       
        ]
       },
       order: [
        ['id', 'DESC'],
        ],         
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

//  @route                  GET  /api/v2/farmer/reset
//  @desc                   Get farmer 
//  @access                 Private
router.get('/reset', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmer reset API called')

  try {
    const farmerFound = await farmer.findAll({
      where: {
        [Op.and]: [
          {
              reset: 
              {
                  [Op.eq] : true
              }
          }, 
          {
              reject: 
              {
                [Op.eq] : false
              }
          }       
        ]
       }, 
       order: [
        ['id', 'ASC'],
        ],             
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

//  @route                  GET  /api/v2/farmer/reject
//  @desc                   Get farmer 
//  @access                 Private
router.get('/reject', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmer reject API called')

  try {
    const farmerFound = await farmer.findAll({
      where: {
          reject: 
          {
              [Op.eq] : true
          }
       },
       order: [
        ['id', 'ASC'],
        ],       
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

//  @route                  POST  /api/v2/farmer/add
//  @desc                   Post add farmer
//  @access                 private
router.post('/add', JwtMiddleware.checkToken, async (req, res) => {
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


//  @route                  GET  /api/v2/farmer/approve/:id
//  @desc                   Get farmer by Id
//  @access                 Private
router.get('/approve/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmer by Id API called')
  let id = req.params.id

  try {
    const farmerFound = await farmer.findOne({
      where: { id }    
    })

    if (farmerFound) {

      farmer.update({ status: true})      

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

//  @route                  GET  /api/v2/farmer/notapprove/:id
//  @desc                   Get farmer by Id
//  @access                 Private
router.get('/notapprove/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmer by Id API called')
  let id = req.params.id

  try {
    const farmerFound = await farmer.findOne({
      where: { id }    
    })

    if (farmerFound) {

      farmerFound.update({ reject: true})      

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

module.exports = router
