/*
	*** Resolution *** 
	SMARTPHONE: 320 px
		=>  die Box kann 30% höher ausfallen 
	Tablet: 
		$(window).resize(function() {
				  $('#winwidth').html(  $(window).width()	) ;

		});	



  */      
  		'use strict';

        $(document).ready(function()	{

       		//$('#winwidth').html( $(window).width() );
			$('#clock').simpleClock();
			// YYYY-MM-DD
			var dateObj =	$().getDateString() ;
			var regExSlashToI = "/\/(.+?)\//";  // to replace /this/ with <i>this</i>

		   	$.ajax({
			    type: "GET",
			    url: "./data/LosungenFree2016.xml",
			    dataType: "xml",
			    success: function(xml) {
					// dateObj.dateString: YYYY-MM-DD
					// find the DOM node of today. first fetch node <Datum>, the parent is the current <Losungen>
					var losungHeute = $(xml).find("Datum:contains("+ dateObj.dateString +")" ).parent();  
					var losText =  losungHeute.children( "Losungstext").text() ;
					losText = losText.replace(  /\/(.+?)\//  , '<i>$1</i><br />' ); // replace /
					losText = losText.replace(  /#(.+?)#/  , '<b>$1</b>' ); 	// replace #
					$('#los-text').html( losText );		
					$('#los-vers').html( losungHeute.children( "Losungsvers").text()  );

					var lehrText =  losungHeute.children( "Lehrtext").text() ;
					lehrText = lehrText.replace(  /\/(.+?)\//  , '<i>$1</i><br />' ); 	// replace /
					lehrText = lehrText.replace(  /#(.+?)#/  , '<b>$1</b>' ); 	// replace #
					$('#los-lehrtext').html( lehrText );
					$('#los-lehrvers').html( losungHeute.children( "Lehrtextvers" ).text()  );
  	
			    },
			    error: function() {
					alert("XML File konnte nicht geladen/verarbeitet werden");
				}
		   });
	  });
