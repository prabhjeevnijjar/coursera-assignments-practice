const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dishRouter = require("./dishRouter");
const promoRouter = require("./promoRouter");
const leaderRouter = require("./leaderRouter");
const Dishes = require("./models/dishes");  
const app = express();

const url = "mongodb://localhost:27017/test";
const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log("mongodb server connected");
})
.catch((err)=>{
    console.log("errpr:: "+err);
})

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));


app.use("/dishes",dishRouter);


app.listen(3000,()=>{
    console.log("Server started on port 3000");
});