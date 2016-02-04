
$(document).ready(init);

var arrayOfItemsObjectsG = [];
var arrayOfRowContainersObjectsG = [];
var originalArrayOfItemsObjectsG = [];
var priceTotalG = 0; 

var arrayOfItemsObjectsSortedByNameG = [];
var arrayOfItemsObjectsSortedByPriceG = [];
var sortedByNameFlagG = false; 
var sortedByPriceFlagG = false; 

function init(){
	$('.items-list').on('click', '.name-col', displayItemDetails);
	$('.items-list').on('click', '.price-col', displayItemDetails); 
	$('.items-list').on('click', '.image-col', displayItemDetails); 
	$('.items-list').on('click', '.request-col', requesting); 

	$('.items-list').on('click', '.delete-col', deleteItem);  
	$('.items-list').on('click', '.edit-col', editItem);  

	$('.items-list').on('click', '.name-title', sortByName); 
	$('#logme').hide();
    $('#regme').hide();
	getItems();
}

function getItems(){
	
	$.get('/transactions', function(data){
			arrayOfItemsObjectsG = data.slice();  
			originalArrayOfItemsObjectsG = data.slice();
			updateArrayOfRowContainers();
			displayRowContainers(); 
   });
}

function deleteItem(){
	var indexOfItem = $(this).closest('.row-container').index() - 1;
	var itemId = arrayOfItemsObjectsG[indexOfItem]._id;

	$.ajax({
  	method: "DELETE",
 		url: "/transactions/" + itemId
		})
		.done(function(status){
			arrayOfItemsObjectsG.splice(indexOfItem,1);
			updateArrayOfRowContainers();
			displayRowContainers();
 		});
}

function editItem(){
	var indexOfItem = $(this).closest('.row-container').index() - 1;
	var itemObject = arrayOfItemsObjectsG[indexOfItem]; 
	var itemId = itemObject._id;

	location.href = '/editItem/' + itemId;
}

function displayItemDetails(){
	var indexOfItem = $(this).closest('.row-container').index() - 1;
	var itemId = arrayOfItemsObjectsG[indexOfItem]._id;
	location.href = '/itemDetails/' + itemId;
}



function sortByName(){
	if(sortedByNameFlagG === false){
		
		arrayOfItemsObjectsG = arrayOfItemsObjectsG.sort(function(object1, object2){
			return object1.name.localeCompare(object2.name);
		});
		sortedByNameFlagG = true;
  } else {
  	arrayOfItemsObjectsG = originalArrayOfItemsObjectsG.slice();
  	sortedByNameFlagG = false;
  }

	updateArrayOfRowContainers();
	displayRowContainers();
}

function requesting(){
	alert("You are requesting to barter with this vehicle")
}



function updateArrayOfRowContainers(){
	$('.items-list').empty(); 
	arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

		var $titleRow = $('<tr>').addClass('row-container row-title');

		var $itemModel = $('<td>').addClass('name-title col-md-3 col-xs-3').text('Model');
		$titleRow.append($itemModel);

		var $itemMake = $('<td>').addClass('price-title col-md-3 col-xs-3').text('Make');
		$titleRow.append($itemMake);

		var $itemYear = $('<td>').addClass('quantity-title col-md-3 col-xs-3').text('Year');
		$titleRow.append($itemYear);

		var $itemPrice = $('<td>').addClass('quantity-title col-md-3 col-xs-3').text('Price');
		$titleRow.append($itemPrice);

		var $imageTitle = $('<td>').addClass('image-title col-md-3 col-xs-3').text('Image');
		$titleRow.append($imageTitle);

		var $deleteTitle = $('<td>').addClass('delete-title col-md-3 col-xs-3').text('');
		$titleRow.append($deleteTitle);

		var $editTitle = $('<td>').addClass('edit-title col-md-3 col-xs-3').text('');
		$titleRow.append($editTitle);

	arrayOfRowContainersObjectsG.push($titleRow);

	arrayOfItemsObjectsG.map(function(item){
		var $rowContainer = $('<tr>').addClass('row-container row-item');

		var $modelColumn = $('<td>').addClass('name-col col-md-3 col-xs-3').text(item.model); 
	    	$rowContainer.append($modelColumn); 

	    var $makeColumn = $('<td>').addClass('price-col col-md-3 col-xs-3').text(item.make);
			$rowContainer.append($makeColumn);	

		var $yearColumn = $('<td>').addClass('quantity-col col-md-3 col-xs-3').text(item.year);
			$rowContainer.append($yearColumn);	

		var $priceColumn = $('<td>').addClass('quantity-col col-md-3 col-xs-3').text('$' + item.price);
			$rowContainer.append($priceColumn);	

		// var $editColumn = $('<td>').addClass('-col col-md-3 col-xs-3').text('Edit');
		// 	$rowContainer.append($editColumn);

	    var $imageColumn = $('<img>').addClass('thumb').attr('src', item.image);
			$rowContainer.append($imageColumn);	
			
		var $deleteColumn = $('<td>').addClass('request-col col-md-3 col-xs-3').text('Request');
			$rowContainer.append($deleteColumn);	

	    arrayOfRowContainersObjectsG.push($rowContainer);
		});
	
}

function displayRowContainers(){
	$('.items-list').append(arrayOfRowContainersObjectsG);
}