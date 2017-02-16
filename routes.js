var routes = {};
var index = require('./controllers/index');
var messages = require('./controllers/messages')

routes.add = function (app) {
	app.use('/', index);
	app.use('/messages', messages);
};

module.exports = routes;