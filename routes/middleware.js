/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore'),
	querystring = require('querystring'),
	keystone = require('keystone'),
    moment = require('moment'),
    snippetsFunctions = require('../lib/app/snippets');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	/*	
	locals.navLinks = [
		{ label: 'Home',		key: 'home',		href: '/' },
		{ label: 'Gallery',		key: 'gallery',		href: '/gallery' }
	];
	*/
	
	locals.user = req.user;
	
    locals.section = '';

    locals.utils = _;
    locals.moment = moment;
    locals.dateFormatString = {long:'MMMM Do YYYY, h:mm a',veryLong:'dddd, MMMM Do YYYY, h:mm a'};

    locals.currentYear = moment().format('YYYY');

    locals.google_api_key = keystone.get('google api key');

    locals.isWinter = ( moment() > moment().month(11).day(1).year(Date.year) && moment() < moment().month(2).day(1).year(Date.year + 1) ? true : false );

    // Add your own local variables here

    locals.navLinks = [{
        label: 'HOME',
        key: 'home',
        href: '/home'
    },{
        label: 'ABOUT US',
        key: 'about',
        href: '/about',
        dropdown: [
        	{
        		label: 'About Summer Harvest',
        		key: 'about',
        		href: '/about'
        	},
        	{
        		label: 'Meet the Board',
        		key: 'about',
        		href: '/page/board'
        	}
        ]
    }, {
        label: 'CONTACT US',
        key: 'contact',
        href: '/contact'
    }, {
        label: 'SIGN UP!',
        key: 'signup',
        href: '/signup'
    }
    /*, {
        label: 'REGISTER A GARDEN OR TREE',
        key: 'register',
        href: '/register'
    }
    */];

    snippetsFunctions.getAll(10, function(err, snippets) {
        locals.snippets = snippets;
        snippetsFunctions.getPages(50,function(err,pages) {
            locals.pages = pages;
            next();
        });
        //next();
    });

	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};
