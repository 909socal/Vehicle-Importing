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

	$('.items-list').on('click', '.delete-col', deleteItem);  
	$('.items-list').on('click', '.edit-col', editItem);  
	$('.items-list').on('click', '.barter', barterItem);  


	$('.items-list').on('click', '.name-sort', sortByName); 
	$('#logme').hide();
    $('#regme').hide();
	getItems();
}

function getItems(){
	
	$.get('/transactions', function(data){
			arrayOfItemsObjectsG = data.slice();  
			originalArrayOfItemsObjectsG = data.slice();
			
		
   });
}

function barterItem(){
	alert("are you you want to barter a vehicle?");
}

function deleteItem(){
	var item = $(this).closest('tr');
	var itemId = item.attr("id");
	var itemIndex = item.index();
	console.log(itemIndex)

	$.ajax({
  	method: "DELETE",
 		url: "/transactions/" + itemId
		})
		.done(function(status){
			item.remove();
			arrayOfItemsObjectsG.splice(itemIndex,1);
		
 		});
}

function editItem(){
	var itemId = $(this).closest('tr').attr("id");
	location.href = '/editItem/' + itemId;
}

function displayItemDetails(){
	var itemId = $(this).closest('tr').attr("id");
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

	
}
