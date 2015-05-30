var keystone = require('keystone'),
	moment = require('moment');

var Distribution = keystone.list('Distribution');

var next = function(limit,cb) {
	Distribution.model.find()
		.where('distributionDate').gte(moment().startOf('day').toDate())
		.sort('distributionDate')
		.populate('distributionLocation')
		.limit(limit)
		.exec(function(err, distributions) {
			cb(err, distributions);
		});
}

exports.next = next;