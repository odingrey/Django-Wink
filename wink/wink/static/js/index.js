
function init(){
	// Initial function, loads main and defaults
	$( '#main_button').addClass('active');
       	$( '#infobox' ).attr('linked', '#main');
	
	// Loads html information into the content divs
	$( '#register' ).load( 'register' );
	$( '#settings' ).load( 'settings' );
	$( '#registerAPI' ).load( 'registerAPI' );
	$( '#changeAPI' ).load( 'changeAPI' );

        // Adds 'linked' attributes to each button linking to their content divs
 	$( '#main_button' ).attr('linked', '#main');
	$( '#login_button' ).attr('linked', '#login');
	$( '#logout_button' ).attr('linked', '#logout');
	$( '#api_change_button' ).attr('linked', '#changeAPI');

	// Link menu clicking to clickMenu command
        $('#menu_left li').click(function(){clickMenu(this)});
        $('#menu_right li').click(function(){clickMenu(this)});
	$.material.init()
};
init();

function clickMenu(button){
	if ($(button).attr('linked') != $( '#infobox' ).attr('linked')){ //do nothing if already on that div
		$( '#infobox' ).html($($(button).attr('linked')).html());	  //sets infobox html to content div html
	$('#menu_right li').removeClass('active');						  //removes button highlight
				$('#menu_left li').removeClass('active');						 //removes button highlight
	$('#' + $(button).attr('id')).addClass('active');			  //highlights selected button
		$( '#infobox' ).attr('linked', $(button).attr('linked'));	  //tells infobox which div is linked
	}
	if ($( '#infobox' ).attr('linked') == '#main'){
//		fetchDevices();
	}
};
