const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const leaderRouter = require("./routes/leaderRouter");
const promotionRouter = require("./routes/promotionRouter");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const url = "mongodb://127.0.0.1:27017/test";
const connect = mongoose.connect(url);
    connect.then((db)=>{
        console.log("mongo db server connected with success!!");
    })
    .catch((err)=>{
        console.log("error encountered: "+err);
    })
app.use("/leaders",leaderRouter);
//app.use("/promotions",promotionRouter);
app.listen(3000,()=>{
    console.log("server started at port 3000");
})