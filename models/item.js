'use strict'

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	owner:{type: mongoose.Schema.Types.ObjectId, ref:"User", ref: "User", required: true},
	model:{type:String, require:true},
	make:{type:String, require:true},
	year:{type:String, require:true},
	price:{type:Number, require:true},
	image:{type:String, require:true},
	weTrading: {type: Boolean, required: true, default: true}
});

var Item = mongoose.model('Items', itemSchema);


module.exports = Item; 

