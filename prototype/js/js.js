$(function() {
	
	$('.app').center();
	
	$('input').blur(function() {
		
		if ( $(this).val() == '' ) {
			
		} else if ( $(this).val() == 'yes' ) {
			$('body').hide();
		}
		
	});
	
	$('input[type="password"]').keyup(function() {
	
		if ( $(this).val() !== '' ) {
		
			$('input[value="Sign Up"]').css( 'color', 'rgb(120,120,120)' );
		
		} else {
			
			$('input[value="Sign Up"]').css( 'color', 'rgb(210,210,210)' );
			
		}
	
	});

	$.ajax({
			url: 'http://ontariobeerapi.ca/docs/api-docs/stores',
			method: 'GET',
			dataType: 'json',
			crossDomain: true
		}).then(function(data) {
			console.log(data);
		});
	
});