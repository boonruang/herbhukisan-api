const express = require('express')
const router = express.Router()
const marketplace = require('../models/marketplace')
const sequelize = require('../config/db-instance')
const { QueryTypes } = require('sequelize');
const emptyPoint = require('../data/mockEmptyPoint.json')

//  @route                  GET  /api/v2/marketplace/list
//  @desc                   list all marketplaces
//  @access                 Private
router.get('/list/:search', async (req, res) => {
  console.log('get marketplace list API called')
  let searchText = req.params.search
  if (searchText.length > 0 && searchText !== 'all' ) {
   queryStr = `WHERE address LIKE '%${searchText}%' OR tambon LIKE '%${searchText}%' OR amphoe LIKE '%${searchText}%' OR province LIKE '%${searchText}%'`
  } else if (searchText == 'all') {
    queryStr = ''
  }
  try {
        const geosoilFound = await sequelize.query(`
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
                  'marketplacename', marketplacename,
                  'address', address,
                  'tambon',tambon,
                  'amphoe',amphoe,
                  'province',province,
                  'postcode',postcode,                
                  'latitude',latitude,
                  'longitude',longitude,
                  'icon', 'place'
                  )
              )
          )
      )
      FROM marketplaces
      ${queryStr}
      ;
    `, {
        type: QueryTypes.SELECT,
      }); 
      if (geosoilFound) {
          console.log('geosoilFound1 in map', geosoilFound)
          if (geosoilFound[0]?.json_build_object?.features == null) {
            console.log('features null')
            res.status(200).json({
              status: 'ok',
              result: emptyPoint
            }) 
          } else {
            console.log('geosoilFound2 in map')
            res.status(200).json({
              status: 'ok',
              result: geosoilFound[0].json_build_object,
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


//  @route                  GET  /api/v2/marketplace/list/:id
//  @desc                   list all marketplaces by Id
//  @access                 Private
router.get('/list/:id', async (req, res) => {
  console.log('get marketplace list by Id API called')
  let ID = req.params.id  || 'ANY'
  console.log('ID',ID) 
  try {
        const geosoilFound = await sequelize.query(`
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
                  'marketplacename', marketplacename,
                  'address', address,
                  'tambon',tambon,
                  'amphoe',amphoe,
                  'province',province,
                  'postcode',postcode,                 
                  'latitude',latitude,
                  'longitude',longitude,
                  'icon', 'place'
                  )
              )
          )
      )
      FROM marketplaces
      WHERE id=${ID};
    `, {
        type: QueryTypes.SELECT,
      }); 
      if (geosoilFound) {
        // console.log('geosoilFound in map', geosoilFound)
        console.log('geosoilFound in map')
        res.status(200).json({
          status: 'ok',
          result: geosoilFound[0].json_build_object,
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

// Get marketplace by keyword
// router.get('/keyword/:keyword', async (req, res) => {
//   const { keyword } = req.params;
//   let result = await marketplace.findAll({
//     where: { name: { [Op.like]: `%${keyword}%` } }
//   });
//   console.log(': marketplace ' + JSON.stringify(result));
//   res.json(result);
// });


module.exports = router
