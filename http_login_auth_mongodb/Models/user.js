const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uname:{
        type:String,
        required:true,
        unique:true
    },
    pass:{
        type:String,
        required:true
    }
});

let users = mongoose.model("User",userSchema);
module.exports = users;


