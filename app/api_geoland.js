const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs')
// const constants = require('../config/constant')
// const JWT = require('jsonwebtoken')
// const JwtConfig = require('../config/Jwt-Config')
// const formidable = require('formidable')
// const JwtMiddleware = require('../config/Jwt-Middleware')
// const Sequelize = require('sequelize')
const sequelize = require('../config/db-instance')
const { QueryTypes } = require('sequelize');

//  @route                  GET  /api/v2/geoland/list
//  @desc                   list all geosoils
//  @access                 Private
router.get('/list',async (req, res) => {
  console.log('get geoland list API called')
  try {
    const geoLandFound = await sequelize.query(`
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
              'id',         'ogc_fid',
              'geometry',   ST_AsGeoJSON(wkb_geometry)::json,
              'properties', json_build_object(
                  -- list of fields
              'OBJECTID', objectid,
              'LUL2_CODE', lul2_code,
              'LU_CODE', lu_code,
              'LU_DES_TH', lu_des_th,
              'LU_DES_EN', lu_des_en,
              'LUL1_CODE', lul1_code,
              'Shape_Leng', shape_leng,
              'Shape_Length', shape_length,
              'Shape_Area', shape_area				
              )
          )
      )
  )
  FROM land_kanglerngchan;
    `, {
        type: QueryTypes.SELECT,
      }); 
      if (geoLandFound) {
        // console.log('geoLandFound in map', geoLandFound)
        console.log('geoLandFound in map')
        res.status(200).json({
          status: 'ok',
          result: geoLandFound[0].json_build_object,
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