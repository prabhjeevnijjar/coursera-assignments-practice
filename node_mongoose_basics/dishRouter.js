const router = require("express").Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Dishes = require("./models/dishes");

    router.get("/",(req,res)=>{
        Dishes.find({})
            .then((dishes)=>{
                console.log(dishes);
                res.setHeader('Content-Type', 'application/json');
                res.json(dishes);
            })
            .catch((err)=>{
                console.log(err);
            })     
    });
    router.put("/",(req,res)=>{
       // res.statusCode = 403;
        res.send('PUT operation not supported on /dishes');
    });
    router.post("/",(req,res)=>{
        Dishes.create(req.body)
            .then((dish)=>{
                console.log(dishes);
                res.setHeader('Content-Type', 'application/json');
                res.json(dishe);
            })
            .catch((err)=>{
                console.log(err);
            })  
    });
 
    router.delete("/",(req,res)=>{
        res.send('Can not delete all dishes');
    });

    router.get("/:dishId",(req,res)=>{
        Dishes.findById(req.params.dishId)
        .then((resp)=>{
            console.log(dishes);
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        })
        .catch((err)=>{
            console.log(err);
        })  
    });
    router.put("/:dishId",(req,res)=>{
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, { new: true })
        .then((dish) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish);
        }, (err) => next(err))
        .catch((err) => next(err));
    });
    router.post("/:dishId",(req,res)=>{
        res.send("not supported post") ;
   });
    router.delete("/:dishId",(req,res)=>{
        Dishes.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
    });
module.exports = router;
//dishId