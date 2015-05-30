var keystone = require('keystone'),
	moment = require('moment');

var Snippet = keystone.list('Snippet');
var Page = keystone.list('Page');

var getAll = function(limit, cb) {
	Snippet.model.find()
		.limit(limit)
		.exec(function(err, Snippets) {
			cb(err, Snippets);
		});
}

var getPages = function(limit, cb) {
	Page.model.find({
		'state': 'published'
	})
		.select('key title')
		.limit(limit)
		.exec(function(err, Pages) {
			cb(err, Pages);
		});
}

exports.getAll = getAll;
exports.getPages = getPages;