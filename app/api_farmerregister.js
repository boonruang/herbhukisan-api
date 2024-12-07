const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const farmer = require('../models/farmer')
const farmerlog = require('../models/farmerlog')
const farmerregister = require('../models/farmerregister')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Op = Sequelize.Op

//  @route                  POST  /api/v2/farmerregister
//  @desc                   Post add farmerregister
//  @access                 public
router.post('/', async (req, res) => {
  console.log('farmerregisterregister add is called')
  
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await farmerregister.create(fields);
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

//  @route                  GET  /api/v2/farmerregister/list
//  @desc                   list all farmerregisters
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmerregister API called')
  try {
    const farmerregisterFound = await farmerregister.findAll({
      where: {
        status: { 
           [Op.eq] :  true
          } 
      },
      order: [
        ['id','ASC']
      ],
    })
    if (farmerregisterFound) {
      console.log('farmerregisterFound in list API: ', farmerregisterFound)
      res.status(200).json({
        status: 'ok',
        result: farmerregisterFound,
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

//  @route                  GET  /api/v2/farmerregister/select/:id
//  @desc                   Get farmerregister by Id
//  @access                 Private
router.get('/select/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmerregister by Id API called')
  let id = req.params.id

  try {
    const farmerregisterFound = await farmerregister.findOne({
      where: { id }    
    })

    if (farmerregisterFound) {
      res.status(200).json({
        status: 'ok',
        result: farmerregisterFound,
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

//  @route                  GET  /api/v2/farmerregister/status
//  @desc                   Get farmerregister 
//  @access                 Private
router.get('/status', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmerregister status API called')

  try {
    const farmerregisterFound = await farmerregister.findAll({
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

    if (farmerregisterFound) {
      res.status(200).json({
        status: 'ok',
        result: farmerregisterFound,
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

//  @route                  GET  /api/v2/farmerregister/reset
//  @desc                   Get farmerregister 
//  @access                 Private
router.get('/reset', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmerregister reset API called')

  try {
    const farmerregisterFound = await farmerregister.findAll({
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

    if (farmerregisterFound) {
      res.status(200).json({
        status: 'ok',
        result: farmerregisterFound,
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

//  @route                  GET  /api/v2/farmerregister/reject
//  @desc                   Get farmerregister 
//  @access                 Private
router.get('/reject', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmerregister reject API called')

  try {
    const farmerregisterFound = await farmerregister.findAll({
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

    if (farmerregisterFound) {
      res.status(200).json({
        status: 'ok',
        result: farmerregisterFound,
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


//  @route                  GET  /api/v2/farmerregister/approve/:id
//  @desc                   Get farmerregister by Id
//  @access                 Private
router.get('/approve/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmerregister by Id API called')
  let id = req.params.id

  try {
    let farmerregisterFound = await farmerregister.findOne({
      where: { id }    
    })

    farmerregisterFound.update({ status: true})   


    if (farmerregisterFound) {

      // farmerregisterFound.status = true 
      // delete farmerregisterFound.dataValues.id
      // remove id from object 
      const {  id, ...rest } =  farmerregisterFound.dataValues
      // console.log('farmerregisterFound',farmerregisterFound)
      console.log('rest',rest)

      if (farmerregisterFound.status) {
        // console.log('farmerregisterFound',farmerregisterFound)
        // console.log('farmerregisterFound',farmerregisterFound.dataValues)

        let result = await farmer.create(rest);

        if (result) {
          res.status(200).json({
            status: 'ok',
            result: result,
          })
        } else {
          res.status(200).json({
            status: 'result not ok',
          })        
        }
      } else {
        res.status(200).json({
          status: 'farmerregisterFound.status not true or farmerregisterFound.id exist',
        })        
      }

        // res.status(200).json({
        //   status: 'ok',
        //   result: farmerregisterFound,
        // })

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

//  @route                  GET  /api/v2/farmerregister/notapprove/:id
//  @desc                   Get farmerregister by Id
//  @access                 Private
router.get('/notapprove/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get farmerregister by Id API called')
  let id = req.params.id

  try {
    const farmerregisterFound = await farmerregister.findOne({
      where: { id }    
    })

    if (farmerregisterFound) {

      farmerregisterFound.update({ reject: true})      

      res.status(200).json({
        status: 'ok',
        result: farmerregisterFound,
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
