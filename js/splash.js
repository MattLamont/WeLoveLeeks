var search_string;
var from;
var to;
var getMore;

$(document).ready( function() {
	$('.parallax').parallax();

	$(".button-collapse").sideNav();

	from = 0;
	to = 12;
	getMore = false;

	$('.search-recipe').change( function() {

		search_string = $(this).val();
		console.log( "search string = " + search_string );
		$('.search-recipe').val( search_string );

		if( search_string != "" || 
			search_string.length >= 2 )
		{
			getMore = false;
			queryApi( search_string , 0 , 12 , addRecipes );
		}

	});


	$( '#suggest-chicken' ).click( function(){
		getMore = false;
		from = 0;
		to = 12;
		search_string = "chicken";
		queryApi( "chicken" , from , to , addRecipes );
	} );

	$( '#suggest-pork' ).click( function(){
		getMore = false;
		from = 0;
		to = 12;
		search_string = "pork";
		queryApi( "pork" , from , to , addRecipes );
	} );

	$( '#suggest-fish' ).click( function(){
		getMore = false;
		from = 0;
		to = 12;
		search_string = "fish";
		queryApi( "fish" , from , to , addRecipes );
	} );

	$( '#suggest-soup' ).click( function(){
		getMore = false;
		from = 0;
		to = 12;
		search_string = "soup";
		queryApi( "soup" , from , to , addRecipes );
	} );

	$( '#suggest-vegetarian' ).click( function(){
		getMore = false;
		from = 0;
		to = 12;
		search_string = "vegetarian";
		queryApi( "vegetarian" , from , to , addRecipes );
	} );

	$( '#suggest-dessert' ).click( function(){
		getMore = false;
		from = 0;
		to = 12;
		search_string = "dessert";
		queryApi( "dessert" , from , to , addRecipes );
	} );

	$( '#get-more-button' ).click( function(){
		getMore = true;
		from += 12;
		to += 12;
		queryApi( search_string , from , to , addRecipes );
	});

	$('#get-more-button').hide();
	$('.info-card').hide();
	$('#suggest-row1').hide();

	var options = [
	    {selector: '#leek-info-section', offset: 300 , callback: function(el) {
	      	$('#info-card1').slideDown( "slow" , "linear" );
	      	$('#info-card2').slideDown( "slow" , "linear" );
	      	$('#info-card3').slideDown( "slow" , "linear" );
	    } },

	    {selector: '#suggest-section', offset: 300 , callback: function(el) {
	      	$('#suggest-row1').slideDown( "slow" , "linear" );
	    } }
	  ];

  	Materialize.scrollFire(options);


});

function queryApi( search_string , from , to , update_func ){

	var url = /*document.location.hostname +*/
	          '/recipes' +
	          '?q=leek%20' +
	          search_string +
	          '&from=' +
	          from +
	          '&to=' + 
	          to;

	console.log( url );

    $.getJSON( url , update_func );

}

function addRecipes( data ) {
	console.log( data );

	if( !getMore ){
		$('.food-rows').empty();
	}

	if( data.hits.length === 0 ){
		if( !getMore ){
			$(".food-rows").append( '<h5 class="center-align">No Recipes Found</h5>' );
		}
		else{
			$(".food-rows").append( '<h5 class="center-align">No More Recipes Found</h5>' );
			getMore = false;
		}

		$("#get-more-button:hidden").hide();
		return;
	}

	var i = 0;

	while( i < data.hits.length )
	{
		var food_card;

		food_card = '<div class="card col s12 m6 l4 recipe-card">' +
				'<div class="card-image waves-effect waves-block waves-light">' +
  					'<img class="activator" src="'+data.hits[i].recipe.image+'">' +
				'</div>' +
				'<div class="card-content">' +
  					'<span class="card-title activator grey-text text-darken-4 truncate">'+data.hits[i].recipe.label+'</span>' +
				'</div>' +
				'<div class="card-reveal">' +
  					'<span class="card-title grey-text text-darken-4 truncate">'+data.hits[i].recipe.label+'<i class="material-icons right">close</i></span>' +
  					'<ul>';

  		var j = 0;
		while( j < data.hits[i].recipe.healthLabels.length ){
			food_card += '<li>'+data.hits[i].recipe.healthLabels[j]+'</li>';
			j++;
			if( j > 5 ){
				break;
			}
		}

  		food_card += '</ul>'+
  					'<a href="'+data.hits[i].recipe.url+'">Get The Recipe Here</a>'+
				'</div>'+
			'</div>';

		$('.food-rows').append( food_card );

		i++;
	}

	getMore = true;
	
	if( !getMore ){
		var top = $( '.food-display' ).position().top;
		$(window).scrollTop( top );
	}

	$("#get-more-button:hidden").show();
	var top = $( '.food-display' ).position().top;
	$(window).scrollTop( top );
}