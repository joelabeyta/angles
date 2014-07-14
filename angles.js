///////////////////////////////////////////////////////////////////
//    _   _  _  ___ _    ___ ___ 
//   /_\ | \| |/ __| |  | __/ __|
//  / _ \| .` | (_ | |__| _|\__ \
// /_/ \_\_|\_|\___|____|___|___/
//
//
// looks for any element with a class of .angles, grabs the data attributes and adds an absolutely positioned element with the angle height on left or right to the top and/or bottom of that element
// it doesn't actually change the shape of the element, it add triangles on top and/or bottom and margin-top or -bottom to the parent to account for the added height
//
// angle-onbottom and angle-ontop only look for a "yes", leave them blank if you don't want an angle on that side
//
// angle-top-side and angle-bottom-side look for "left" or "right"
//
// default triangles are right, 15px. Just put data-angle-ontop="yes" or data-angle-onbottom="yes" to render default triangles.
//
// obviously it doesn't work if the parent element doesn't have a background color
//
// do something like this
// <div class="header angle" data-angle-onbottom="yes" data-angle-ontop="yes" data-angle-top-height="10" data-angle-top-side="left" data-angle-bottom-height="15" data-angle-bottom-side="left">
// 		A duis et sociis ac pulvinar penatibus eu et urna odio pulvinar et nisi, ultrices! 
// </div>
//
///////////////////////////////////////////////////////////////////

function angles() {
	if( !$("html").hasClass("lt-ie9") ) {

		// console.log('angles ran');

		$('.angle').each(function(){
			var angleWidth = $(this).outerWidth();

			var angleTopHeight = $(this).data('angle-top-height');
			var angleBottomHeight = $(this).data('angle-bottom-height');

			if(angleTopHeight === undefined){
				angleTopHeight = 5;
			}
			if(angleBottomHeight === undefined){
				angleBottomHeight = 2;
			}

			var angleTop = $(this).data('angle-ontop');
			var angleBottom = $(this).data('angle-onbottom');

			var angleTopSide = $(this).data('angle-top-side');
			var angleBottomSide = $(this).data('angle-bottom-side');

			if(angleTopSide === undefined){
				angleTopSide = 'left';
			}
			if(angleBottomSide === undefined){
				angleBottomSide = 'left';
			}

			var angleColor = $(this).css('background-color');

			if(angleTop === 'yes') {
				if($(this).find('.angle-top').length === 0) {
					$(this).append('<div class="angle-top"></div>');
				}

				$(this).css({
					'margin-top': angleTopHeight * 2 + 'px'
				});
			} else if(angleTop === 'no') {
				// do nothing
			} else if (angleTop === undefined) {
				if($(this).find('.angle-top').length === 0) {
					$(this).append('<div class="angle-top"></div>');
				}

				$(this).css({
					'margin-top': angleTopHeight * 2 + 'px'
				});
			}

			if(angleBottom === 'yes') {
				if($(this).find('.angle-bottom').length === 0) {
					$(this).append('<div class="angle-bottom"></div>');
				}

				$(this).css({
					'margin-bottom': angleBottomHeight * 2 + 'px'
				});
			} else if(angleBottom === 'no') {
				// do nothing
			} else if(angleBottom === undefined) {
				if($(this).find('.angle-bottom').length === 0) {
					$(this).append('<div class="angle-bottom"></div>');
				}

				$(this).css({
					'margin-bottom': angleBottomHeight * 2 + 'px'
				});
			}

			var angleTopWidthLeft = 0;
			var angleTopWidthRight = 0;

			if(angleTopSide === 'left') {
				angleTopWidthLeft = 0;
				angleTopWidthRight = angleWidth;
				$(this).find('.angle-top').css({
					'left': '0'
				});					
			}
			
			if(angleTopSide === 'right') {
				angleTopWidthRight = 0;
				angleTopWidthLeft = angleWidth;
				$(this).find('.angle-top').css({
					'right': '0'
				});					
			}
			
			$(this).find('.angle-top').css({
				'border-width': '0 ' + angleTopWidthRight + 'px ' + angleTopHeight + 'px ' + angleTopWidthLeft + 'px',
				'border-color': 'rgba(255,255,255,0) rgba(255,255,255,0) ' + angleColor + ' rgba(255,255,255,0)'
			});


			var angleBottomWidthLeft = 0;
			var angleBottomWidthRight = 0;

			if(angleBottomSide === 'left') {
				angleBottomWidthLeft = 0;
				angleBottomWidthRight = angleWidth;
				$(this).find('.angle-bottom').css({
					'left': '0'
				});
			}
			
			if(angleBottomSide === 'right') {
				angleBottomWidthRight = 0;
				angleBottomWidthLeft = angleWidth;
				$(this).find('.angle-bottom').css({
					'right': '0'
				});
			}

			$(this).find('.angle-bottom').css({
				'border-width': angleBottomHeight + 'px ' + angleBottomWidthRight + 'px ' + '0 ' + angleBottomWidthLeft + 'px',
				'border-color': angleColor + ' rgba(255,255,255,0) rgba(255,255,255,0) rgba(255,255,255,0)'
			});
		});
	}
}

$(window).resize(function(){
	angles();
});
