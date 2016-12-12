$(document).ready( function() {
	$('.parallax').parallax();
	$.getJSON( 'https://api.edamam.com/search?q=leek&app_id=2d6c2a99&app_key=5606e20badfd6352c1bc3f69ee283b23&from=0&to=48' , display );

	$(".food-item").hover( foodItemHoverOn , foodItemHoverOff );
});

function display( data ){

	var i = 0;
	while( i < data.hits.length )
	{
		var image1 = "<img class=\"food-item-img responsive-img\" src=" + data.hits[i].recipe.image + "></img>"
		var label1 = "<p class=\"food-item-label truncate\">" + data.hits[i].recipe.label + "</p>";
		var link1 = data.hits[i].recipe.url;
		var food_item1 = "<div class=\"food-item col s4 hoverable center-align\" onclick=\"location.href='" + link1 + "'\">" + image1 + label1 + "</div>";

		var image2 = "<img class=\"food-item-img responsive-img\" src=" + data.hits[i+1].recipe.image + "></img>"
		var label2 = "<p class=\"food-item-label truncate\">" + data.hits[i+1].recipe.label + "</p>";
		var link2 = data.hits[i+1].recipe.url;
		var food_item2 = "<div class=\"food-item col s4 hoverable center-align\" onclick=\"location.href='" + link2 + "'\">" + image2 + label2 + "</div>";

		var image3 = "<img class=\"food-item-img responsive-img\" src=" + data.hits[i+2].recipe.image + "></img>"
		var label3 = "<p class=\"food-item-label truncate\">" + data.hits[i+2].recipe.label + "</p>";
		var link3 = data.hits[i+2].recipe.url;
		var food_item3 = "<div class=\"food-item col s4 hoverable center-align\" onclick=\"location.href='" + link3 + "'\">" + image3 + label3 + "</div>";

		var food_row = "<div class=\"row\">" + food_item1 + food_item2 + food_item3 + "</div>";

		$(".food-display").append( food_row );

		i = i + 3;
	}
}

function foodItemHoverOn(){
	$(this).css("background-color" , "blue" );
}

function foodItemHoverOff(){
	$(this).css("background-color" , "white" );
}