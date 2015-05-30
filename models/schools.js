var keystone = require('keystone'),
	Types = keystone.Field.Types;

var School = new keystone.List('School');

School.add({
	name: {
		type: String,
		required: true,
		index: true
	}
});

School.register();