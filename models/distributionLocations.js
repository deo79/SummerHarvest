var keystone = require('keystone'),
	Types = keystone.Field.Types;

var DistributionLocation = new keystone.List('DistributionLocation');

DistributionLocation.add({
	name: {
		type: String,
		required: true,
		index: true
	},
	location: Types.Location,
	mapUrl:{
		type: String,
		required:false
	},
	createdDate: {
		type: Types.Date,
		index: true,
		default: Date.now
	},
	active: {
		type: Boolean,
		default: true
	}
});


DistributionLocation.addPattern('standard meta');
DistributionLocation.defaultSort = '-createdDate';
DistributionLocation.register();