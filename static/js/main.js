var subscribe_form = function(id) {
	$.post(
		"/subscribe",
		{
			"email": $("#js-subscribe--" + id + " > input").val()
		},
		function (data) {
			// data = $.parseJSON(data);
			if (data["success"] == 1) {
				// Good
				$('#js-status').removeClass('failure');
				$('#js-status').addClass('success fadeIn');
				$('#js-status').text('Thanks! You\'ll be one of the first to hear about awesome updates.');

				$('#email').attr('disabled', 'disabled');
				// $('#email').attr('placeholder', 'Thanks! Stay tuned :)');
				$('#email').css('color', '#CCCCCC');
			}

			else {
				// Bad
				$('#js-status').removeClass('success');
				$('#js-status').addClass('failure');
				$('#js-status').text('Please enter a valid email!');
				$('#email').focus();
			}
		},
		"json"
	);
};
