var keystone = require('keystone'),
	distributions = require('../../lib/app/distributions');

exports = module.exports = function(req, res) {
	
	var locals = res.locals,
		view = new keystone.View(req, res);
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	
	
	distributions.next(10, function(err, distributions) {
		locals.nextDistributions = distributions;
		view.render('index');
	});

};
