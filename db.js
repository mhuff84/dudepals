var r = require('rethinkdb');
var db = {};

var connection = null;
r.connect( {host: 'localhost', port: 28015, db: 'dudepals'}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})

// Topic Groups

db.getTopicGroup = function(key){
	return r.table('topicGroups').get(key);
};

db.getTopicGroups = function(filter, callback){
	if(filter){
		r.table('topicGroups').filter(filter).orderBy(r.desc('lastUpdated')).run(connection, function(err, cursor){
			if (err) throw err;

			cursor.toArray(function(err, result){
				if (err) throw err;

				callback(result);
			})
		});

	} else {
		r.table('topicGroups').orderBy(r.desc('lastUpdated')).run(connection, function(err, cursor){
			if (err) throw err;

			cursor.toArray(function(err, result){
				if (err) throw err;

				callback(result);
			})
		});
	}
};

db.saveTopicGroup = function(topicGroup, callback){
	if(!topicGroup.id){
		var now = new Date();

		topicGroup.lastUpdated = now;
		topicGroup.created = now;

		//remove me
		topicGroup.lastUpdatedBy = 'huffdad';
		topicGroup.createdBy = 'huffdad';

		r.table('topicGroups').insert(topicGroup).run(connection, function(err, result){
			if (err) throw err;

			topicGroup.id = result.generated_keys[0];

			callback(topicGroup);
		});

	} else {
		topicGroup.lastUpdated = new Date();

		db.getTopicGroup(topicGroup.id).update(topicGroup).run(connection, function(err, result) {
			if (err) throw err;

			callback(topicGroup);
		});
	}
};

// Topics

db.getTopic = function(key){
	return r.table('topics').get(key);
};

db.getTopics = function(filter, callback){
	if(filter){
		r.table('topics').filter(filter).orderBy(r.desc('lastUpdated')).run(connection, function(err, cursor){
			if (err) throw err;

			cursor.toArray(function(err, result){
				if (err) throw err;

				callback(result);
			})
		});

	} else {
		r.table('topics').orderBy(r.desc('lastUpdated')).run(connection, function(err, cursor){
			if (err) throw err;

			cursor.toArray(function(err, result){
				if (err) throw err;

				callback(result);
			})
		});
	}
};

db.saveTopic = function (topic, callback) {
	if(!topic.id){
		var now = new Date();

		topic.lastUpdated = now;
		topic.created = now;

		r.table('topics').insert(topic).run(connection, function(err, result){
			if (err) throw err;

			topic.id = result.generated_keys[0];

			var group = db.getTopicGroup(topic.groupId);

			group.update({ topics: parseInt(group.topics + 1) }).run(connection, function(err, result) {
				if (err) throw err;
			});

			callback(topic);
		});

	} else {
		topic.lastUpdated = new Date();

		db.getTopic(topic.id).update(topic).run(connection, function(err, result) {
			if (err) throw err;

			callback(topic);
		});
	}
}

// Posts

db.getPost = function(key) {
	return r.table('posts').get(key);
};

db.getPosts = function(filter, callback) {
	if(filter){
		r.table('posts').filter(filter).orderBy('lastUpdated').run(connection, function(err, cursor){
			if (err) throw err;

			cursor.toArray(function(err, result){
				if (err) throw err;

				callback(result);
			})
		});

	} else {
		r.table('posts').orderBy('lastUpdated').run(connection, function(err, cursor){
			if (err) throw err;

			cursor.toArray(function(err, result){
				if (err) throw err;

				callback(result);
			})
		});
	}	
};

db.savePost = function(post, callback){
	if(!post.id){
		var now = new Date();

		post.lastUpdated = now;
		post.created = now;

		r.table('posts').insert(post).run(connection, function(err, result){
			if (err) throw err;

			post.id = result.generated_keys[0];

			var topic = db.getTopic(post.topicId);

			topic.update({ posts: parseInt(topic.posts + 1) }).run(connection, function(err, result){
				if (err) throw err;

				var group = db.getTopicGroup(topic.groupId);

				group.update({ topics: parseInt(group.topics + 1), posts: parseInt(group.posts + 1) }).run(connection, function(err, result) {
					if (err) throw err;
				});				
			});		

			callback(post);
		});

	} else {
		post.lastUpdated = new Date();

		db.getTopic(post.id).update(post).run(connection, function(err, result) {
			if (err) throw err;

			callback(post);
		});
	}
}

module.exports = db;