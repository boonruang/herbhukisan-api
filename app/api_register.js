const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const farmer = require('../models/farmer')
const farmerlog = require('../models/farmerlog')
const register = require('../models/register')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const JwtMiddleware = require('../config/Jwt-Middleware')
const Op = Sequelize.Op

//  @route                  POST  /api/v2/register
//  @desc                   Post add register
//  @access                 public
router.post('/', async (req, res) => {
  console.log('registerregister add is called')
  
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await register.create(fields);
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

//  @route                  GET  /api/v2/register/list
//  @desc                   list all registers
//  @access                 Private
router.get('/list', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get register API called')
  try {
    const registerFound = await register.findAll({
      where: {
        status: { 
           [Op.eq] :  true
          } 
      },
      order: [
        ['id','ASC']
      ],
    })
    if (registerFound) {
      console.log('registerFound in list API: ', registerFound)
      res.status(200).json({
        status: 'ok',
        result: registerFound,
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

//  @route                  GET  /api/v2/register/select/:id
//  @desc                   Get register by Id
//  @access                 Private
router.get('/select/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get register by Id API called')
  let id = req.params.id

  try {
    const registerFound = await register.findOne({
      where: { id }    
    })

    if (registerFound) {
      res.status(200).json({
        status: 'ok',
        result: registerFound,
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

//  @route                  GET  /api/v2/register/status
//  @desc                   Get register 
//  @access                 Private
router.get('/status', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get register status API called')

  try {
    const registerFound = await register.findAll({
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

    if (registerFound) {
      res.status(200).json({
        status: 'ok',
        result: registerFound,
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

//  @route                  GET  /api/v2/register/reset
//  @desc                   Get register 
//  @access                 Private
router.get('/reset', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get register reset API called')

  try {
    const registerFound = await register.findAll({
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

    if (registerFound) {
      res.status(200).json({
        status: 'ok',
        result: registerFound,
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

//  @route                  GET  /api/v2/register/reject
//  @desc                   Get register 
//  @access                 Private
router.get('/reject', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get register reject API called')

  try {
    const registerFound = await register.findAll({
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

    if (registerFound) {
      res.status(200).json({
        status: 'ok',
        result: registerFound,
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


//  @route                  GET  /api/v2/register/approve/:id
//  @desc                   Get register by Id
//  @access                 Private
router.get('/approve/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get register by Id API called')
  let id = req.params.id

  try {
    let registerFound = await register.findOne({
      where: { id }    
    })

    registerFound.update({ status: true})   


    if (registerFound) {

      // registerFound.status = true 
      // delete registerFound.dataValues.id
      // remove id from object 
      const {  id, reset, reject, ...rest } =  registerFound.dataValues
      // console.log('registerFound',registerFound)
      console.log('rest',rest)

      // res.status(200).json({
      //   status: 'ok',
      //   rest: rest,
      // })


      if (registerFound.status && rest) {
        // console.log('registerFound',registerFound)
        // console.log('registerFound',registerFound.dataValues)

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
          status: 'registerFound.status not true or registerFound.id exist',
        })        
      }

        // res.status(200).json({
        //   status: 'ok',
        //   result: registerFound,
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

//  @route                  GET  /api/v2/register/notapprove/:id
//  @desc                   Get register by Id
//  @access                 Private
router.get('/notapprove/:id', JwtMiddleware.checkToken, async (req, res) => {
  console.log('get register by Id API called')
  let id = req.params.id

  try {
    const registerFound = await register.findOne({
      where: { id }    
    })

    if (registerFound) {

      registerFound.update({ reject: true})      

      res.status(200).json({
        status: 'ok',
        result: registerFound,
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
