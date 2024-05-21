const express = require('express')
const router = express.Router()
const formidable = require('formidable');
const herbal = require('../models/herbal')
const farmergroup = require('../models/farmergroup')
const constants = require('../config/constant');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

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
            {akaname: {[Op.like]: '%' + searchText + '%'}}
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

//  @route                  GET  /api/v2/herbal/list
//  @desc                   list all herbals
//  @access                 Private
router.get('/list', async (req, res) => {
  console.log('get herbal API called')
  try {
    const herbalFound = await herbal.findAll({
      include: {
        model: farmergroup
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

//  @route                  GET  /api/v2/herbal/:id
//  @desc                   Get herbal by Id
//  @access                 Private
router.get('/:id', async (req, res) => {
  console.log('get herbal by Id API called')
  let id = req.params.id

  try {
    const herbalFound = await herbal.findOne({
      where: { id },
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

module.exports = router
