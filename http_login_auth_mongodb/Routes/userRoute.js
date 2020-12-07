const bodyParser = require("body-parser");

const router = require("express").Router();
let User = require("../Models/user");
router.use(bodyParser.json());

router.post("/signup",(req,res)=>{
    let username = req.body.uname;
    User.findOne({uname:username})
        .then((user)=>{
            if(user!=null){
                res.setHeader("Content-Type","application/json");
                var err = new Error("User "+username+" already exist. Try Again");
                err.status = 403;
            } else {
                User.create({
                    username:   req.body.username,
                    password:   req.body.password   })
                    .then((user)=>{
                        res.setHeader("Content-Type","application.json");
                        res.statusCode = 200;
                        res.json({
                            ustatus: 'Registration Successful!', user: user
                        })
                    .catch((err)=>{
                        console.log(err);
                       })
                    })

            }
        },(err)=>{console.log(err)})
        .catch((err)=>{
            console.log(err);
        })
});
router.post("/login",(req,res)=>{
    if (!req.session) {                                     //check if session exist 
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
        var passw = auth[1];

        //check uname exist in db
        User.findOne({uname: user})
            .then ((user)=>{
                if (user === null) {
                    //user not found
                    var err = new Error('User ' + user.uname + ' does not exist!');
                    err.status = 403;
                    return next(err);

                } else if( user.pass != passw) {
                    // wrong pass
                    var err = new Error('Your password is incorrect!');
                    err.status = 403;
                    return next(err);

                } else if ( user.pass === pass && user.uname === user){
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
                })
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