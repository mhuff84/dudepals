var express = require('express');
var router = express.Router();
var db = require('../db.js')

router.get('/', function(req, res, next) {
  db.getPosts(function(data){
  	res.render('posts', { data: data });
  });
}).get('/:id', function(req, res next) {
	var id = req.params.id;

	//get topics
}).post('/:id', function(req, res, next) {
	//save topics
});

module.exports = router;