var r = require('rethinkdb');
var db = {};

var connection = null;
r.connect( {host: 'localhost', port: 28015, db: 'dudepals'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})

db.addMessage = function(message, callback){
	message.timestamp = new Date();

	r.table('messages').insert(message).run(connection, function(err, result) {
	    if (err) throw err;

	    var record = message;

	    record.id = result.generated_keys;
	    callback(record);
	});
}

db.getMessages = function(callback){
	r.table('messages').orderBy(r.desc('timestamp')).run(connection, function(err, cursor){
		if (err) throw err;

		cursor.toArray(function(err, result){
			if (err) throw err;

			callback(result);
		})
	})
}

module.exports = db;