$(document).ready(function() {
	$('.numeric').numeric();
	signupType();
	$('#signupType').on('click', function() {
		signupType();
	});
});

function signupType() {
	if ($('#signupType').val() == 'volunteer' && $('#signupType').prop('checked')) {
		$('.distribution').hide();
		$('.volunteer').show();
	} else {
		$('.distribution').show();
		$('.volunteer').hide();
	}
}