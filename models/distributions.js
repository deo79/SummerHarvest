var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Distribution = new keystone.List('Distribution');

Distribution.add({
	name: {
		type: Types.Text,
		initial: true,
		required: true,
		index: true
	},
	distributionDate: {
		type: Types.Datetime,
		initial: true,
		index: true,
		default: Date.now
	},
	distributionLocation: {
		type: Types.Relationship,
		initial: true,
		ref: 'DistributionLocation',
		index: true
	}
});

Distribution.addPattern('standard meta');
Distribution.defaultSort = '-distributionDate';
Distribution.defaultColumns = 'name, distributionLocation, distributionDate';
Distribution.register();