const bodyParser = require("body-parser");

const router = require("express").Router();
let User = require("../Models/user");
router.use(bodyParser.json());

router.post("/signup",(req,res,next)=>{
    let username = req.body.uname;
    User.findOne({uname:username})
        .then((user)=>{
            if(user!=null){
                res.setHeader("Content-Type","application/json");
                var err = new Error("User "+username+" already exist. Try Again");
                err.status = 403;
                next(err);
            } else {
                User.create({
                    uname:   req.body.uname,
                    pass:   req.body.pass   })
                    .then((user)=>{
                        res.setHeader("Content-Type","application/json");
                        res.statusCode = 200;
                        res.json({
                            "ustatus": 'Registration Successful!',
                             "user": user
                        })
                        
                    },(err)=>{ console.log(err); })
                    .catch((err)=>{ console.log(err); })
            }
        },(err)=>{console.log(err)})
        .catch((err)=>{console.log(err);})
});
router.post("/login",(req,res,next)=>{
    if (!req.session.user) {                                     //check if session exist 
        var authHeader = req.headers.authorization;

        if (!authHeader) {
            var err = new Error('You are not authenticated!');
            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 401;
            return next(err);
            
        }
        var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var userR = auth[0];
        var passw = auth[1];

        //check uname exist in db
        User.findOne({uname: userR})
            .then ((user)=>{
                if (user === null) {
                    //user not found
                    var err = new Error('User '+userR+'does not exist!');
                    err.status = 403;
                    return next(err);

                } else if( user.pass != passw) {
                    // wrong pass
                    var err = new Error('Your password is incorrect!');
                    err.status = 403;
                    return next(err);

                } else if ( user.pass === passw && user.uname === userR){
                    //authorized
                    req.session.user = 'authenticated';
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/plain');
                    res.end('You are authenticated!')
                } else {
                    var err = new Error('You are not authenticated!');
                    res.setHeader('WWW-Authenticate', 'Basic');      
                    err.status = 401;
                    next(err);
                }
                },(err) => next(err))
                .catch((err) => next(err));

    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('You are already authenticated!');
    }
});
router.get("/logout",(req,res)=>{
    if (req.session) {
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/');
      }
      else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
      }
});



module.exports = router;