var keystone = require('keystone'),
	Farm = keystone.list('Farm'),
	validator = require('validator');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'register';

	view.render('register',{});

};

module.exports.registerSaved = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'register';

	view.render('register-saved',{});

};

module.exports.doRegister = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'register';

	var nameString = validator.trim(req.body.name),
		firstName = '',
		lastName = '',
		errors = [],
		pretendItIsGood = false,
		emailHoneyPot = validator.trim(req.body.email),
		emailAddress = validator.trim(req.body.purpose),
		type = validator.trim(req.body.type),
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

	var newFarm = new Farm.model({
		name: {
			first: firstName,
			last: lastName
		},
		type: type,
		email: emailAddress,
		phone: phone,
		comments: comments
	});

	if(errors.length > 0 ) {
		locals.name = newFarm.name;
		locals.type = newFarm.type;
		locals.email = newFarm.email;
		locals.phone = newFarm.phone;
		locals.comments = newFarm.comments;
		res.render('register', locals);
	} else {
		newFarm.save(function(err, farmer) {
			if(err) {
				console.error(err);
			}
			res.redirect('/register-saved');
		});
	}

}