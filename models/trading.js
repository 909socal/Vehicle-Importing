'use strict';
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var User = require('./user')
var Item = require('./item')
var Schema = mongoose.Schema;
var Trade;

var tradeSchema = Schema({
  item1: {type:  Schema.Types.ObjectId, ref:"Item" },
  item2: {type:  Schema.Types.ObjectId, ref:"Item" }
  
});

tradeSchema.statics.newTrade = (req, res, cb) => { 
  trade = new Trade();
  itemInfo = req.body
  payload = jwt.decode(req.cookies.token, process.env.JWT_SECRET)
  User.find({"username": itemInfo.owner}, function(err, item1){
    trade.item1 = item1[0]._id;
    Item.find({owner: trade.item1, itemName: itemInfo.}, function(err, itemForTrade){
      trade.responseItem = (itemForTrade[0]._id);
      
  })
}



