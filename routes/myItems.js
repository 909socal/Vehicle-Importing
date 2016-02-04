var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var jwt = require('jwt-simple');

// var authMiddleware = require('../config/auth');

// router.use(authMiddleware);

/* GET home page. */
router.get('/', function(req, res, next) {
  var token = req.cookies.mytoken;
  var info = jwt.decode(token, process.env.JWT_SECRET);
  Item.find({owner: info._id}, function(err, userItems){
	console.log(userItems);
	res.render('myItems', {items: userItems});
  });
});



module.exports = router;