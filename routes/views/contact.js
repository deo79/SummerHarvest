var keystone = require('keystone'),
	contacts = require('../../lib/app/contacts');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'contact';

	view.render('contact',{});

}

var contactTake = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	contacts.saveContact(req, res, function(err, contact) {
		if (err) {
			req.flash('error', err);
			locals.section = 'contact';
			view.render('contact',contact);
		} else {
			res.redirect('/contact-saved');
		}
	});
}

var contactSaved = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'contact';

	view.render('contact-saved');

}

exports.contactTake = contactTake;
exports.contactSaved = contactSaved;