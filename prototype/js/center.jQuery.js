jQuery.fn.center = function() {

	var element = this;
	
	Centertitle();
	
	function Centertitle() {
	
		var objectHeight = $(element).height();
		var objectWidth = $(element).width();
		var windowHeight = $(window).height();
		var windowWidth = $(window).width();
		
		$(element).css({
			'position' : 'absolute',
			'top' : windowHeight/2 - objectHeight/2,
			'left' : windowWidth/2 - objectWidth/2
		});
	
	
		$(window).resize(function() {
			
			var objectHeight = $(element).height();
			var objectWidth = $(element).width();
			var windowHeight = $(window).height();
			var windowWidth = $(window).width();
			
			$(element).css({
				'position' : 'absolute',
				'top' : windowHeight/2 - objectHeight/2,
				'left' : windowWidth/2 - objectWidth/2
			});
		
		});
	};
	
};