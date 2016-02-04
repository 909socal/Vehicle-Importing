$(document).ready(init);

function init(){
	console.log('inside init of createItem.js');	
	$('#create-item-btn').on('click', createItemBtn);
	$('#logme').hide();
    $('#regme').hide();
}

function createItemBtn(){
	console.log('inside createItemBtn() in createItem.js');
	var model = $('#model').val();
	var make = $('#make').val();
	var year = $('#year').val();
	var price = $('#price').val();
	var image = $('#image').val();
	
	var itemObject={
			model: model,
	  		make: make,
	  		year: year, 
	  		image:image, 
	  		price:parseFloat(price), 
	  	};
	console.log('item object to post', itemObject);

  $.post('/addItem', itemObject)
	.success(function(data) {
		console.log('item objected posted', itemObject);
		location.href = '/pending';
  }).fail(function(err) {
    alert('something went wrong :(')
  });	
}