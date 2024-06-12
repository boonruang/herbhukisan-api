const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const herbal = require('../models/herbal')
const farmergroup = require('../models/farmergroup')
const constants = require('../config/constant')
const Sequelize = require('sequelize')
const property = require('../models/property')
const character = require('../models/character')
const benefit = require('../models/benefit')
const reference = require('../models/reference')
const nutrition = require('../models/nutrition')
const sequelize = require('../config/db-instance')
const { QueryTypes } = require('sequelize');
const Op = Sequelize.Op
const request = require('request-promise')
const cheerio = require('cheerio')
const herbalPrice = require('../data/herbalPrice')

// Upload Image
uploadImage = async (files, doc) => {
  if (files.image != null) {
    var fileExtention = files.image.name.split('.')[1];
    doc.image = `${doc.id}.${fileExtention}`;
    var newpath =
      path.resolve(__dirname + '/uploaded/images/') + '/' + doc.image;
    if (fs.exists(newpath)) {
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath);

    // Update database
    let result = product.update(
      { image: doc.image },
      { where: { id: doc.id } }
    );
    return result;
  }
};

//  @route                  GET  /api/v2/herbal/list/:search
//  @desc                   list all herbals search
//  @access                 Private
router.get('/list/:search', async (req, res) => {
  console.log('get herbal search API called')
  let searchText = req.params.search

  try {
    const herbalFound = await herbal.findAll({
        where: {
          [Op.or]: [
            {herbalname: {[Op.like]: '%' + searchText + '%'}},
            {commonname: {[Op.like]: '%' + searchText + '%'}},
            {scientificname: {[Op.like]: '%' + searchText + '%'}},
            {othername: {[Op.like]: '%' + searchText + '%'}},
            {ph: {[Op.like]: '%' + searchText + '%'}},
            {soil: {[Op.like]: '%' + searchText + '%'}},
            {disease: {[Op.like]: '%' + searchText + '%'}}
          ]
        }
    })

    if (herbalFound) {
      console.log('herbalFound in list API: ', herbalFound)
      res.status(200).json({
        status: 'ok',
        result: herbalFound,
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

//  @route                  GET  /api/v2/herbal/show/:soil/:ph
//  @desc                   show all herbals by soil and ph
//  @access                 Private
router.get('/show/:ph/:soil', async (req, res) => {
  console.log('get herbal show API called')
  let searchPh = req.params.ph
  let searchSoil = req.params.soil
  console.log ('ph and soil', searchPh + ' AND ' + searchSoil)
  let phInputStart = parseFloat(req.params.ph.split('-')[0])  
  let phInputEnd = parseFloat(req.params.ph.split('-')[1])  
  console.log ('phInputStart, phInputEnd', phInputStart + ' || ' + phInputEnd)

  if (req.params.ph && req.params.soil) {
    try {
      const herbalFound = await herbal.findAll({
          where: {
            [Op.and]: [
              {
                [Op.or]: [
                  {
                    [Op.and]: [
                      {phstart: {[Op.lte]: phInputStart}},
                      {phend: {[Op.gte]: phInputStart}},                    
                    ]
                  },
                  {
                    [Op.and]: [
                      {phstart: {[Op.lte]: phInputEnd}},
                      {phend: {[Op.gte]: phInputEnd}},                    
                    ]
                  },
                ]
              },
              {soil: {[Op.like]: '%' + searchSoil + '%'}},
            ]
          }
      })

      if (herbalFound) {
        console.log('herbalFound in list API: ', herbalFound)
        res.status(200).json({
          status: 'ok',
          result: herbalFound,
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
  } else {
    console.log('no req.params')
  }
})

//  @route                  GET  /api/v2/herbal/list
//  @desc                   list all herbals
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get herbal API called')
  try {
    const herbalFound = await herbal.findAll({
      order: [
        ['id','ASC']
      ],
      include : [
        {
          model: farmergroup,
          through: {
            attributes: []
          }
        },
        // {
        //   model: property,
        //   through: {
        //     attributes: []
        //   }
        // },        
        // {
        //   model: character,
        //   through: {
        //     attributes: []
        //   }
        // },        
        // {
        //   model: benefit,
        //   through: {
        //     attributes: []
        //   }
        // },        
        // {
        //   model: reference,
        //   through: {
        //     attributes: []
        //   }
        // },        
        // {
        //   model: nutrition,
        //   through: {
        //     attributes: []
        //   }
        // },        
    ]
    })
    if (herbalFound) {
      console.log('herbalFound in list API: ', herbalFound)
      res.status(200).json({
        status: 'ok',
        result: herbalFound,
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

//  @route                  GET  /api/v2/herbal/:id
//  @desc                   Get herbal by Id
//  @access                 Private
router.get('/select/:id', async (req, res) => {
  console.log('get herbal by Id API called')
  let id = req.params.id

  try {
    const herbalFound = await herbal.findOne({
      where: { id },
      include : [
        {
        model: farmergroup,
          through: {
            attributes: []
          }
        },
    //     {
    //       model: property,
    //       through: {
    //         attributes: []
    //       }
    //     },        
    //     {
    //       model: character,
    //       through: {
    //         attributes: []
    //       }
    //     },        
    //     {
    //       model: benefit,
    //       through: {
    //         attributes: []
    //       }
    //     },        
    //     {
    //       model: reference,
    //       through: {
    //         attributes: []
    //       }
    //     },        
    //     {
    //       model: nutrition,
    //       through: {
    //         attributes: []
    //       }
    //     },        
      ]
    })

    if (herbalFound) {
      // res.status(200).json(herbalFound)
      res.status(200).json({
        status: 'ok',
        result: herbalFound,
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


//  @route                  POST  /api/v2/herbal
//  @desc                   Post add herbal
//  @access                 Private
router.post('/', async (req, res) => {
  console.log('herbal add is called')
  
  try {
    const form = new formidable.IncomingForm();
    console.log('form.parse(req)',form.parse(req))

    form.parse(req, async (error, fields, files) => {
      let result = await herbal.create(fields);
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


//  @route                  GET  /api/v2/herbal/newid
//  @desc                   Get new id
//  @access                 Private
router.get('/newid', async (req, res) => {
  console.log('herbal newid is called')
  
  try {
    const idFound = await herbal.findOne({
      order: [ [ 'id', 'DESC' ]],
    })

    if (idFound) {
      res.status(200).json({
        status: 'ok',
        result: idFound.dataValues.id+1,
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

//  @route                  GET  /api/v2/herbal/updated
//  @desc                   to update phStart and phEnd
//  @access                 Private
router.get('/updated', async (req, res) => {
  console.log('herbal updated is called')

  try {
    const phFound = await sequelize.query(`
      UPDATE herbals SET phstart=split_part(ph,'-',1)::real, phend=split_part(ph,'-',2)::real WHERE ph IS NOT NULL;
     `, {
         type: QueryTypes.UPDATE,
     }); 
 
     if (phFound) {
       res.status(200).json({
         status: 'ok',
         result: phFound,
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

//  @route                  GET  /api/v2/herbal/price
//  @desc                   get scraping price
//  @access                 Private
router.get('/price', async (req, res) => {
  console.log('herbal price scraping is called')

  const URL = 'https://j-pad.net/%E0%B8%A3%E0%B8%B2%E0%B8%84%E0%B8%B2%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B8%A7%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%B5%E0%B9%89?cate=12';

  try {

    const response = await request(URL)
    let $ = cheerio.load(response)

    const data = [...$("table.table-bordered")].map(e =>
      Object.fromEntries([...$(e).find("tr")].map(e =>
        [...$(e).find("a,span")].map(e => $(e).text())
      ))
    );

    let converted = Object.entries(data[0]).map(([key,value]) => ({name: key, price: value }) );
    // console.log(converted);

    let herbalData = converted.slice(1)
 
     if (herbalData) {
       res.status(200).json({
         status: 'ok',
         result: herbalData,
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
