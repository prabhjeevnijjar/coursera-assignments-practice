const mongoose = require("mongoose");

const Schema = new mongoose.Schema;
const promoDocSchema = new Schema({
    name:{
        type:String,
        required:true
    },image:{
        type:String,
        required:true
    },label:{
        type:String,
        required:true
    },price:{
        type:String,
        required:true
    },description:{
        type:String,
        required:true
    },featured:{
        type:Boolean,
        required:true
    }
});
let promotions = mongoose.model("leader",promoDocSchema);
module.exports = promotions;