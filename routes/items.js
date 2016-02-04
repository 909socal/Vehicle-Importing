var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var jwt = require('jwt-simple');
// var authMiddleware = require('../config/auth');

// router.use(authMiddleware);

/* GET home page. */

console.log("IM REQUIRED")
router.get('/', function(req, res, next) {
  console.log("IN THE GET FUNCTION")

  res.render('addItem');
});

router.post('/', function(req, res, next) {
  console.log(req.cookies.mytoken)
  var info = jwt.decode(req.cookies.mytoken, process.env.JWT_SECRET);
  console.log(info);
  var item = new Item(req.body);
  item.owner = info._id;
  item.save(function(err, savedItem){
  	console.log(savedItem || err)
  	res.send(savedItem);
  }); 
});


// router.post('/test', function(req,res){
// 	Item.find({}, function(err, item){
// 		res.send(item)
// 	}).populate('owner')
// });


module.exports = router;