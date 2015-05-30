var keystone = require('keystone');

var Page = keystone.list('Page');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res),
		locals = res.locals;

	locals.section = 'about';

	view.query('thisPage',
		Page.model.findOne()
		.where('key', 'about')
		.where('state', 'published')
	);

	view.render('page');

}

var page = function(req, res) {
	var view = new keystone.View(req, res),
		locals = res.locals;
	locals.section = '';
	view.query('thisPage',
		Page.model.findOne()
		.where('key', req.params.name)
		.where('state', 'published')
	);
	view.render('page');
}

exports.page = page;