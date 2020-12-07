const express = require("express");
const mongodb = require("mongodb");
const session = require("express-session");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const FileStore = require("express-file-store")
const userRouter = require("./Routes/userRoute");
const app = express();

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
connect.then((db)=>{
    console.log("connection to mongodb successful");
})
.catch((err)=>{
    console.log("err:: "+err);
})

app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

//auth function
function auth (req, res, next) {
    console.log("session:: "+req.session);
    console.log("headers:: "+req.headers);
    if (!req.session) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            next(err);
            return;
        }
        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password') {
            console.log("authorized")
            next(); // authorized
        } else {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');      
            err.status = 401;
            next(err);
        }
    } else {
        if (req.session.user == "admin"){
            console.log("used: admin found"+req.session);
        } else {
            err = new Error("U are not authenticated !");
            err.status = 401;
            next(err);
        }
    }
}

app.use(auth);
app.listen(3000,()=>{
    console.log("node server started at port 3000");
});