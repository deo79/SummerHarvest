var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Snippet = new keystone.List('Snippet');

Snippet.add({
	name: {
		type: Types.Text,
		required: true,
		index: true
	},
	type:{
		type:Types.Select,
		options:['home-page-left','home-page-right']
	},
	content: {
		type: Types.Html,
		wysiwyg: true,
		height: 150
	}
});

Snippet.register();