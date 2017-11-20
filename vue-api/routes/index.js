var express = require('express');
var router = express.Router();
var mongoose = require('../modules/database.js')
var Category = require('../models/category.js');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});




module.exports = router;
