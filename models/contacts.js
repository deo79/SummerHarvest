var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Contact = new keystone.List('Contact');

Contact.add({
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
		type: String,
	},
	comments: {
		type: Types.Textarea,
		required: true,
		initial: false
	},
	contactDate: {
		type: Types.Date,
		index: true,
		default: Date.now
	}
});

Contact.schema.methods.sendContactEmail = function(cb) {
	var contact = this;
	new keystone.Email('contact-us').send({
			elements: [{
				label: 'Name',
				val: contact.name.first || contact.name.full
			}, {
				label: 'Email',
				val: contact.email
			}, {
				label: 'Phone',
				val: contact.phone
			}, {
				label: 'Date',
				val: contact.contactDate
			}, {
				label: 'Comments',
				val: contact.comments
			}],
			name: contact.name.first || contact.name.full,
			body: contact.comments,
			subject: 'Contact from Summer Harvest website: ' + (contact.name.first || contact.name.full)
		}, {
			to: 'amy.ll.payne@gmail.com',
			bcc: 'daniellogue@gmail.com',
			from: {
				name: 'Summer Harvest Website',
				email: 'no-reply@summerharvest.us'
			}
		},
		cb
	);
}

Contact.addPattern('standard meta');
Contact.defaultColumns = 'name, email, phone, contactDate|20%';
Contact.defaultSort = '-contactDate';
Contact.register();