const router = require("express").Router();
const promotions = require("../models/leaders");
const bodyParser = require("body-parser");

const leaders = require("../models/leaders");

router.get("/",(req, res)=>{
    leaders.find({})
        .then((leader)=>{
            //res.statusCode(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(leader);
        })
        .catch((err)=>{
            console.log("you got error: "+err);
        })
});
router.put("/",(req, res)=>{
    res.send("cannot perform put operation !");
});

router.post("/",(req, res)=>{
    console.log(req.body.name);

    leaders.find().exec(function (err, results) {
        var count = results.length;
        if(count === 0){      //check if the result array is empty from above query ie the user name does not exist in db
        leaders.create(req.body)
            .then((leader)=>{
                console.log(leader+" added to collection");
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            })
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.json({"message":"User already exist in database"});
        }
    });
});

router.delete("/",(req, res)=>{
    res.json({"message":"you cannot delete all"})
});
//TODO: FROM HERE ON UPDATE ACC TO :LEADEID


router.get("/:leaderId",(req, res)=>{
    leaders.findById(req.params.leaderId)
        .then((leader)=>{
            if(leader != null){
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.json({"message":"leader ID does not exist"});
            }
            
        })
        .catch((err)=>{
            console.log("you got error: "+err);
        })
});
router.put("/:leaderId",(req, res)=>{
    leaders.findById(req.params.leaderId)
        .then((leader)=>{
            if(leader != null){
                if (req.body.name) {
                   leader.id(req.params.commentId).name = req.body.name;
                }
                if (req.body.designation) {
                    leader.id(req.params.commentId).designation = req.body.designation;                
                }
                dish.save()
                .then((leader) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leader);                
                }, (err) => next(err));
            }
            else if (leader == null) {
                err.status = 404;
                return next(err);
            }
            else {
                err.status = 404;
                return next(err);            
            }
        }, (err) => next(err))
        .catch((err) => next(err));
});

router.post("/:leaderId",(req, res)=>{

  res.json({"message":"post operation not supported"});
});

router.delete("/:leaderId",(req, res)=>{
    res.json({"message":"you cannot delete all"})
});
module.exports = router;