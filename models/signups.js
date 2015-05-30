var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Signup = new keystone.List('Signup');

Signup.add({
	name: {
		type: Types.Name,
		initial: true,
		required: true,
		index: true
	},
	/*
	distribution: {
		type: Types.Relationship,
		initial: true,
		ref: 'Distribution',
		index: true
	},
	*/
	school: {
		type: Types.Relationship,
		initial: true,
		ref: 'School',
		index: true
	},
	distributionLocation: {
		type: Types.Relationship,
		initial: true,
		ref: 'DistributionLocation',
		index: true,
	},
	year: {
		type: Types.Number
	},
	email: {
		type: Types.Email,
		initial: true,
		required: true,
		index: true
	},
	phone: {
		type: Types.Text,
		initial: true,
		index: true
	},
	/*
	familySize: {
		type: Types.Number,
		initial: true,
		index: true,
		default: 4
	},
	*/
	numberOfChildren: {
		type: Types.Number
	},
	numberOfAdults: {
		type: Types.Number
	},
	signupType: {
		type: Types.Select,
		initial: true,
		options: 'volunteer, recipient',
		default: 'recipient',
		index: true
	},
	location: Types.Location,
	signupDate: {
		type: Types.Date,
		index: true,
		default: Date.now
	}
});

Signup.addPattern('standard meta');
Signup.defaultColumns = 'name, email, phone, signupType, signupDate';
Signup.defaultSort = '-signupDate';
Signup.register();