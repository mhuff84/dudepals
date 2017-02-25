var express = require('express');
var router = express.Router();
var db = require('../db.js')

router.get('/', function(req, res, next) {
  db.getTopicGroups(null, function(data){
  	res.render('index', { groups: data });
  });
}).get('/:id', function(req, res, next) {
	var id = req.params.id;

	res.render('groupEdit', { group: db.getTopicGroup(id) })
}).post('/save', function(req, res, next) {
	var group = req.body;

	console.log('hit controller');

	db.saveTopicGroup(group, function(record){
		console.log('save complete');
		res.render('group', { group: record });
	});
});

// router.get('/', function(req, res, next){
// 	  db.getMessages(function(messages){
// 	  	res.render('messages', { title: 'Express', messages: messages });
// 	  });
// 	})	
// 	.post('/', function(req, res, next){
// 		//console.log(req.body)
// 	  db.addMessage({ text: req.body.message, user: 'huffdad' }, function(record){
// 	  	res.send('<span style="display:block;width:100%;">' + record.text + '-' + record.timestamp + '</span>');
// 	  });
// })


module.exports = router;