var routes = {};
var index = require('./controllers/index');
var topics = require('./controllers/topics');
var posts = require('./controllers/posts');

routes.add = function (app) {
	app.use('/', index);
	app.use('/messages', messages);
	app.use('/topics', topics);
	app.use('/posts', posts);
};

module.exports = routes;