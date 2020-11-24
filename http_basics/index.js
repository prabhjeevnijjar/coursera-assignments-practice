const http = require("http");
const fs = require("http");
const path = require("path");

let server = http.createServer(
    function(req,res){
        console.log(req.headers);
        res.end("<html><body><h1>new project</h1></body></html>")
    }
);
server.listen(3000,()=>{
    console.log("Server started on port 3000");
})