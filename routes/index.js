var express = require('express');
var router = express.Router();
var db = require('../db.js')


router.get('/', function(req, res, next){
	  db.getMessages(function(messages){
	  	console.log(messages.length)
	  	res.render('index', { title: 'Express', messages: messages });
	  });
	})	
	.post('/', function(req, res, next){
		//console.log(req.body)
	  db.addMessage({ text: req.body.message, user: 'huffdad' }, function(record){
	  	res.send('<span style="display:block;width:100%;">' + record.text + '-' + record.timestamp + '</span>');
	  });
})

module.exports = router;