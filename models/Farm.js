var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Farm = new keystone.List('Farm');

Farm.add({
	name: {
		type: Types.Name,
		required: true,
		index: true
	},
	email: {
		type: Types.Email,
		initial: true,
		required: true,
		index: true
	},
	phone: {
		type: String
	},
	type: {
		type: String
	},
	comments: {
		type: Types.Textarea,
		required: true,
		initial: false
	},
	registrationDate: {
		type: Types.Date,
		index: true,
		default: Date.now
	}
});

Farm.schema.methods.sendFarmEmail = function(cb) {
	var Farm = this;
	new keystone.Email('Farm-us').send({
			elements: [{
				label: 'Name',
				val: Farm.name.first || Farm.name.full
			}, {
				label: 'Email',
				val: Farm.email
			}, {
				label: 'Phone',
				val: Farm.phone
			}, {
				label: 'Type',
				val: Farm.type
			}, {
				label: 'Date',
				val: Farm.registrationDate
			}, {
				label: 'Comments',
				val: Farm.comments
			}],
			name: Farm.name.first || Farm.name.full,
			body: Farm.comments,
			subject: 'Farm from Summer Harvest website: ' + (Farm.name.first || Farm.name.full)
		}, {
			to: 'amy.ll.payne@gmail.com',
			//to: 'daniellogue@gmail.com',
			bcc: 'daniellogue@gmail.com',
			from: {
				name: 'Summer Harvest Website',
				email: 'no-reply@summerharvest.us'
			}
		},
		cb
	);
}

Farm.addPattern('standard meta');
Farm.defaultColumns = 'name, email, phone, type, registrationDate|20%';
Farm.defaultSort = '-registrationDate';
Farm.register();