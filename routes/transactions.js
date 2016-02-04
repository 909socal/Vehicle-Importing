'use strict';

var express = require('express');
var router = express.Router();
var Item = require('../models/item');


router.get('/', function(req, res, next) {
  Item.find({}, function(err, items){
  res.send(items);
  });
});


// router.post('/', function(req, res, next) {
//   var item = new Item(req.body);
//   item.save(function(err, savedItem){
//     console.log(savedItem)
//   	res.send(savedItem);
//   }); 
// });


router.delete('/:itemId', function(req, res, next) {
  Item.findById(req.params.itemId, function(err, item){
  	item.remove(function(err){
  		if(!err) console.log('item removed successfully');
  		res.status(err ? 400:200).send(err||null);
  	});
  });
});


router.put('/:itemId', function(req, res, next) {
  var updatedItemObject = req.body; 
  Item.findById(req.params.itemId, function(err, item){
  	item.model = updatedItemObject.model;
  	item.make = updatedItemObject.make;
  	item.year = updatedItemObject.year; 
  	item.price = updatedItemObject.price;
  	item.save(function(err, savedItem){
  		res.status(err ? 400:200).send(err||savedItem);
  	});
  });
});

module.exports = router;
