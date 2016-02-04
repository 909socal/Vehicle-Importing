$(document).ready(init);

function init(){
	$('#create-item-btn').on('click', saveButton);
	$('#logme').hide();
    $('#regme').hide();
}

function saveButton (event){
	event.preventDefault();
	var itemObject = {};

	itemObject.model = $('#model').val();
	itemObject.make = $('#make').val();
	itemObject.year = $('#year').val();
	itemObject.price = parseFloat($('#price').val());
	itemObject.image = $('#image').val();

	var itemId = $('.itemId').attr('id');
	console.log(itemObject);

	$.ajax({
  	method: 'POST',
 		url: '/editItem/' + itemId,
 		data: itemObject
		})
		.done(function(data, status) {
			alert('Your edits have been saved');
 		});
}
