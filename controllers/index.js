var express = require('express');
var router = express.Router();
var db = require('../db.js')

router.get('/', function(req, res, next){
  db.getMessages(function(messages){
  	res.render('index', { title: 'Express' });
  });
})	

module.exports = router;