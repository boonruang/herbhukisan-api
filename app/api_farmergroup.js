const express = require('express')
const router = express.Router()
const farmergroup = require('../models/farmergroup')
const herbal = require('../models/herbal')
// const farmergroupherbal = require('../models/farmergroupherbal')
const sequelize = require('../config/db-instance')
const { QueryTypes } = require('sequelize');
const emptyPoint = require('../data/mockEmptyPoint.json')


//  @route                  GET  /api/v2/farmergroup/list
//  @desc                   list all farmergroups
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get farmergroup list API called')
  try {
    const farmergroupFound = await farmergroup.findAll({
      include: {
        model: herbal,
        // attributes: ['id','herbalname','commonname'],
        // through: {
        //    model: farmergroupherbal
        // }
       },      
    })
    if (farmergroupFound) {
      console.log('farmergroupFound in list API: ', farmergroupFound)
      res.status(200).json({
        status: 'ok',
        result: farmergroupFound,
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

//  @route                  GET  /api/v2/farmergroup/list
//  @desc                   list all farmergroup
//  @access                 Private
router.get('/list/:search', async (req, res) => {
  console.log('get farmergroup list API called')
  let searchText = req.params.search
  if (searchText.length > 0 && searchText !== 'all' ) {
   queryStr = `WHERE farmergroupname LIKE '%${searchText}%' OR tambon LIKE '%${searchText}%' OR amphoe LIKE '%${searchText}%' OR province LIKE '%${searchText}%'`
  } else if (searchText == 'all') {
    queryStr = ''
  }
  try {
        const farmergroupFound = await sequelize.query(`
        SELECT json_build_object(
          'type', 'FeatureCollection',
          'crs',  json_build_object(
              'type',      'name', 
              'properties', json_build_object(
                  'name', 'EPSG:4326'  
              )
          ), 
          'features', json_agg(
              json_build_object(
                  'type',       'Feature',
                  'id',         'id',
                  'geometry',   ST_AsGeoJSON(ST_MakePoint(longitude, latitude))::json,
                  'properties', json_build_object(
                    -- list of fields
                  'Id', id,
                  'farmergroupname', farmergroupname,
                    'no', no,
                    'moo',moo,
                    'village',village,
                    'tambon',tambon,
                    'amphoe',amphoe,
                    'province',province,
                    'postcode',postcode,                
                    'leader',leader,                
                    'cert',cert,                
                    'member',member,                
                    'area',area,                
                    'image',image,                
                    'latitude',latitude,
                    'longitude',longitude,
                    'icon', 'place'
                  )
              )
          )
      )
      FROM farmergroup
      ${queryStr}
      ;
    `, {
        type: QueryTypes.SELECT,
      }); 
      if (farmergroupFound) {
          console.log('farmergroupFound1 in map', farmergroupFound)
          if (farmergroupFound[0]?.json_build_object?.features == null) {
            console.log('features null')
            res.status(200).json({
              status: 'ok',
              result: emptyPoint
            }) 
          } else {
            console.log('farmergroupFound2 in map')
            res.status(200).json({
              status: 'ok',
              result: farmergroupFound[0].json_build_object,
            })          
          }
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

//  @route                  GET  /api/v2/farmergroup/list
//  @desc                   list all farmergroups select by Id
//  @access                 Private
router.get('/select/:id',async (req, res) => {
  console.log('get farmergroup select by id API called')
  let id = req.params.id
  console.log('id',id)  
  try {
    const farmergroupFound = await farmergroup.findOne({
      where : { id },
      include: {
        model: herbal,
      }
    }); 

      if (farmergroupFound) {
        // console.log('farmergroupFound in map', farmergroupFound)
        console.log('farmergroupFound in map')
        res.status(200).json({
          status: 'ok',
          result: farmergroupFound,
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

module.exports = router
