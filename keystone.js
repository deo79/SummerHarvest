// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Summer Harvest',
	'brand': 'Summer Harvest',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'jade',
	
	'emails': 'templates/emails',
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'cookie secret': 'v0VWJI:Jx!l]mo6v1&_I6C%<QUo/NT&K^4x((8[vv93sA@sV-Fx0nweRnu|@-mod'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://www.your-server.com/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	//'galleries': 'galleries',
	'people and more': ['signups', 'contacts', 'Farm'],
	'distributions': ['distributions','DistributionLocation', 'schools'],
	'site': ['pages', 'snippets'],
	'users': 'users'
});

// Settings

var summerharvestconfig = require('./summerharvestconfig.json');

keystone.set('cloudinary config', {
  cloud_name: summerharvestconfig.cloudinary.cloud_name,
  api_key: summerharvestconfig.cloudinary.api_key,
  api_secret: summerharvestconfig.cloudinary.api_secret
});

keystone.set('google server api key',summerharvestconfig.google['google server api key']);
keystone.set('google api key',summerharvestconfig.google['google api key']);
keystone.set('default region',summerharvestconfig.google['default region']);

keystone.set('mandrill api key',summerharvestconfig.mandrill['mandrill api key']);
keystone.set('mandrill username',summerharvestconfig.mandrill['mandrill username']);

keystone.set('mongo', 'mongodb://localhost/my-project');


// Start Keystone to connect to your database and initialise the web server

keystone.start();
