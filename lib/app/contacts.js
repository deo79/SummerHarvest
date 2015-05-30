var keystone = require('keystone'),
	Contact = keystone.list('Contact'),
	validator = require('validator');

var saveContact = function(req, res, cb) {

	var nameString = validator.trim(req.body.name),
		firstName = '',
		lastName = '',
		errors = [],
		pretendItIsGood = false,
		emailHoneyPot = validator.trim(req.body.email),
		emailAddress = validator.trim(req.body.purpose),
		phone = validator.trim(req.body.phone),
		comments = validator.trim(req.body.comments);

	nameArray = nameString.split(' '),
	firstName = nameArray[0];
	nameArray.splice(0, 1);
	lastName = nameArray.join(' ');

	if (!validator.isEmail(emailAddress)) {
		errors.push('Your email address appears to be not correct... can you check it again?');
	}

	if (firstName.length == 0) {
		errors.push('Please enter your first name.');
	}

	if (lastName.length == 0) {
		errors.push('Please enter your last name.');
	}

	if (comments.length == 0) {
		errors.push('Please enter some comments so that we can help you.');
	}

	if (emailHoneyPot.length > 0) {
		// a bot filled this out.
		pretendItIsGood = true;
	}

	var newContact = new Contact.model({
		name: {
			first: firstName,
			last: lastName
		},
		email: emailAddress,
		phone: phone,
		comments: comments
	});

	if (pretendItIsGood) {
		cb('', {
			name: {
				first: firstName,
				last: lastName
			},
			email: emailHoneyPot,
			phone: phone,
			comments: comments
		});
	} else if (errors.length > 0) {
		cb(errors.join('\r\n'), {
			name: {
				first: firstName,
				last: lastName
			},
			email: emailAddress,
			phone: phone,
			comments: comments
		});
	} else {
		newContact.save(function(err, contact) {
			newContact.sendContactEmail(function(){
				cb(err, contact);
			});
		});
	}

}

exports.saveContact = saveContact;