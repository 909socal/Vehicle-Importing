var express = require('express');
var router = express.Router();

// var authMiddleware = require('../config/auth');

// router.use(authMiddleware);

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('pending');
});



module.exports = router;