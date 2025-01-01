const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const farmer = require('../models/farmer')
const farmerlog = require('../models/farmerlog')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const JwtMiddleware = require('../config/Jwt-Middleware')
const bcrypt = require('bcryptjs')
const Op = Sequelize.Op
const farmergroup = require('../models/farmergroup')
const collaborativefarm = require('../models/collaborativefarm')
const entrepreneurherbal = require('../models/entrepreneurherbal')
const entrepreneurthaitraditionalmedical = require('../models/entrepreneurthaitraditionalmedical')


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
      attributes: {exclude: ['password']},
      order: [
        ['id','DESC']
      ],
    })
    if (farmerFound) {
      // console.log('farmerFound in list API: ', farmerFound)

      const newResults =  farmerFound.map(async (result) => {

        if (result?.farmergroupId?.length > 0 && result?.farmergroupId != 'null' && result?.farmergroupId != 'undefined') {
          // console.log('result farmergroupId ', result?.id+' => '+result?.farmergroupId)
          const farmergroupFound = await farmergroup.findOne({
            where: { id : result?.farmergroupId  }    
          })
            // console.log('farmergroupFound ', farmergroupFound?.farmergroupname)
            result.farmergroupId = farmergroupFound?.farmergroupname
        }

        if (result?.collaborativefarmId?.length > 0 && result?.collaborativefarmId != 'null' && result?.collaborativefarmId != 'undefined') {
          // console.log('result collaborativefarmId ', result?.id+' => '+result?.collaborativefarmId)
          const collaborativefarmFound = await collaborativefarm.findOne({
            where: { id : result?.collaborativefarmId  }    
          })
            // console.log('collaborativefarmFound ', collaborativefarmFound?.name)
            result.collaborativefarmId = collaborativefarmFound?.name          
        }

        return result
      })

      return Promise.all(newResults).then((data) => {
        // console.log("data", data);
        res.status(200).json({
          status: 'ok',
          result: data,
        })
      })

      // const farmerFound = await collaborativefarm.findOne({
      //   where: { id  }    
      // })


      // res.status(200).json({
      //   status: 'ok',
      //   result: farmerFound,
      // })


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


//  @route                  POST  /api/v2/farmer
//  @desc                   Post add farmer
//  @access                 Private
router.post('/', JwtMiddleware.checkToken, async (req, res) => {
  console.log('farmer add is called')
  
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {

      fields.password = bcrypt.hashSync(fields.password, 8)

      // username is cid 
      let farmerFound = await farmer.findOne({
        where: { username: fields.username },
      })     

      if (farmerFound ) {
        // duplicated cid
        res.json({
          result: constants.kResultNok,
          Error: 'Duplicated farmer username (cid)',
        })
      } else {
        // Create farmer
        let result = await farmer.create(fields);
      if (result) {

          res.status(200).json({
            status: 'farmercollaborativefarm created ok',
            result: result,
          })

        } else {
          res.status(200).json({
            status: 'result not ok',
          })        
        }
      }       
    });
  } catch (error) {
    res.json({
      result: constants.kResultNok,
      message: JSON.stringify(error)
    });
  }
});

module.exports = router
