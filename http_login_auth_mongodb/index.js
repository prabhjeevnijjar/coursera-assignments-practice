const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
let User = require("./Models/user");
const userRouter = require("./Routes/userRoute");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
var FileStore = require('session-file-store')(session);

const app = express();

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('12345-67890-09876-54321'));

//creating a permanent session store
app.use(session({
    name:"session-id",
    secret:"2345-67890-09876-54321",
    saveUninitialized:true,
    resave:true,
    store:new FileStore()
}));

//mongoose connection
url = "mongodb://localhost:27017/test";
const connect = mongoose.connect(url);
connect
.then((db)=>{
    console.log("connection to mongodb successful");
})
.catch((err)=>{
    console.log("err:: "+err);
})

//auth function
app.use("/",userRouter);
function auth (req, res, next) {
    console.log(req.session);

  if(!req.session.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}

app.use(auth);

//starting the node server
app.listen(3000,()=>{
    console.log("node server started at port 3000");
});