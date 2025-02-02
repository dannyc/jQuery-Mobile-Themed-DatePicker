/*
* jQuery Mobile Framework : temporary extension to port jQuery UI's datepicker for mobile
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

	//cache previous datepicker ui method
	var prevDp = $.fn.datepicker;
	
	//rewrite datepicker
	$.fn.datepicker = function( options ){
		
		var dp = this;
	
		//call cached datepicker plugin
		prevDp.apply( this, arguments );
		
		//extend with some dom manipulation to update the markup for jQM
		//call immediately
		function updateDatepicker(){
			$( ".ui-datepicker-header", dp ).addClass("ui-body-c ui-corner-top").removeClass("ui-corner-all");
			$( ".ui-datepicker-prev, .ui-datepicker-next", dp ).attr("href", "#");
			$( ".ui-datepicker-prev", dp ).buttonMarkup({iconpos: "notext", icon: "arrow-l", shadow: true, corners: true});
			$( ".ui-datepicker-next", dp ).buttonMarkup({iconpos: "notext", icon: "arrow-r", shadow: true, corners: true});
			$( ".ui-datepicker-calendar th", dp ).addClass("ui-bar-c");
			$( ".ui-datepicker-calendar td", dp ).addClass("ui-body-c");
			$( ".ui-datepicker-calendar a", dp ).buttonMarkup({corners: false, shadow: false}); 
			$( ".ui-datepicker-calendar a.ui-state-active", dp ).addClass("ui-btn-active"); // selected date
			$( ".ui-datepicker-calendar a.ui-state-highlight", dp ).addClass("ui-btn-up-e"); // today"s date
	        $( ".ui-datepicker-calendar .ui-btn", dp ).each(function(){
				var el = $(this);
				// remove extra button markup - necessary for date value to be interpreted correctly
				el.html( el.find( ".ui-btn-text" ).text() ); 
	        });
		};
		
		//update now
		updateDatepicker();
		
		// and on click
		$( dp ).click( updateDatepicker );
		
		//return jqm obj 
		return this;
	};
		
	//bind to pagecreate to automatically enhance date inputs	
	$( ".ui-page" ).live( "pagecreate", function(){		
		$( "input[type='date'], input:jqmData(type='date')", this ).each(function(){
			
			 var date,
			 	$this = $(this),
				id = $this.attr('id'), // TODO what happens without id??
				picker = $( "<div />" ).datepicker({ altField: "#"+id, showOtherMonths: true });
				
			//initialize
			if (date = $this.val()){
				picker.datepicker("setDate", date);
			}
			picker.hide();
			$this.after( picker );
			    
			
			//show when input is focused
		    $this.focus(function() {
		        $this.blur(); //Remove focus so mobile soft keypad does not open
		        picker.show('slow');
		    });
			
			//hide when date selected
			$( '.ui-datepicker-calendar a' ).live('click', function() { 
				$this.val(picker.val());
			        picker.hide('slow');
			});
			
			
		});	
	});
})( jQuery );