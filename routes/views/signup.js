var keystone = require('keystone'),
	Signup = keystone.list('Signup'),
	validator = require('validator'),
	distributions = require('../../lib/app/distributions');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'signup';
	/*
	locals.distributionLocation = ( req.query.distributionLocation ? req.query.distributionLocation : '' );

	distributions.next(10, function(err, distributions) {
		locals.distributions = distributions;
		view.render('signup');
	});
	*/

	var DistributionLocation = keystone.list('DistributionLocation');
	var Schools = keystone.list('School');
	//console.log(DistributionLocation.model);
	DistributionLocation.model.find()
		.where({'active': true})
		.sort('name')
		.exec(function(err, locations) {
			if (err) console.log(err);
			locals.locations = locations;
			Schools.model.find()
				.sort('name')
				.exec(function(err, schools) {
					if (err) console.log(err);
					locals.schools = schools;
					view.render('signup')
				});
		});

}

signupTake = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals,
		errors = [],
		firstName = '',
		nameArray,
		nameString = validator.trim(req.body.name),
		emailHoneyPot = validator.trim(req.body.email),
		emailAddress = validator.trim(req.body.purpose),
		pretendItsGood = false,
		lastName = '';
	locals.section = 'signup';

	nameArray = nameString.split(' '),
	firstName = nameArray[0];
	nameArray.splice(0, 1);
	lastName = nameArray.join(' ');

	if (firstName.length == 0) {
		errors.push('Please enter your full name');
	}

	if (lastName.length == 0) {
		errors.push('Please enter your full first and last name');
	}

	if (!validator.isEmail(emailAddress)) {
		errors.push('Please enter a valid email address.');
	}

	if (emailHoneyPot.length) {
		pretendItsGood = true;
	}

	if (req.body.signupType == 'volunteer') {
		// validate volunteer params
	} else {
		if (validator.toInt(req.body.numberOfChildren, 10) <= 0) {
			errors.push('Please enter the number of children in your household so that we can estimate how mush food is needed.');
		}
		if (validator.toInt(req.body.numberOfAdults, 10) <= 0) {
			errors.push('Please enter the number of adults in your household so that we can estimate how mush food is needed.');
		}
	}

	var loc = req.body.loc;
	console.log(loc);
	console.log(typeof loc);
	( typeof loc != 'string' ? loc = '' : null );
	if( loc.indexOf('Any up') > -1 || loc.indexOf('any up') > -1 ) {
		loc = null;
	}
	console.log(loc);

	var numberOfChildren = validator.toInt(req.body.numberOfChildren, 10);
	var numberOfAdults = validator.toInt(req.body.numberOfAdults, 10);
	if( !numberOfChildren ) {
		numberOfChildren = 0;
	}
	if( !numberOfAdults ) {
		numberOfAdults = 0;
	}


	var newSignup = new Signup.model({
		name: {
			first: firstName,
			last: lastName
		},
		//distribution: req.body.distribution,
		school: req.body.school,
		distributionLocation: loc,
		email: emailAddress,
		phone: req.body.phone,
		numberOfChildren: numberOfChildren,
		numberOfAdults: numberOfAdults,
		signupType: req.body.signupType,
		location: {
			street1: req.body.street1,
			street2: req.body.street2,
			suburb: req.body.suburb,
			postcode: req.body.postcode,
			state: 'CA',
			country: 'US'
		}
	});

	if (errors.length == 0) {
		if (!pretendItsGood) {
			newSignup.save(function(err, signup) {
				if(err) console.log(err);
				res.redirect('/signup-saved');
			});
		} else {
			res.redirect('/signup-saved');
		}
	} else {
		req.flash('error', errors.join('\r\n'));
		locals.section = 'signup';
		view.render('signup', newSignup);
	}


};

signupSaved = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	locals.section = 'signup';
	view.render('signup-saved');
}

exports.signupTake = signupTake;
exports.signupSaved = signupSaved;