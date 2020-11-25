const express = require("express");
const bodyParser = require("body-parser");
const dishRouter = require("./dishRouter");
const promoRouter = require("./promoRouter");
const leaderRouter = require("./leaderRouter");

const app = express();
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));


app.use("/dishes",dishRouter);
app.use("/promotions",promoRouter);
app.use("/leaders",leaderRouter)

app.listen(3000,()=>{
    console.log("Server started on port 3000");
});