const router = require("express").Router();
router.get("/",(req,res)=>{
    res.send('Will send all the dishes to you now!');
});
router.put("/",(req,res)=>{
    res.send('PUT operation not supported on /dishes');
});
router.post("/",(req,res)=>{
    res.send('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});
router.delete("/",(req,res)=>{
    res.send('Deleting all dishes');
});

router.get("/:dishId",(req,res)=>{
    res.send('Will send leader with leader id: !'+req.params.dishId);
});
router.put("/:dishId",(req,res)=>{
    res.write('Updating the dish: ' + req.params.dishId + '\n');
        res.end('Will update the dish: ' + req.body.name +
            ' with details: ' + req.body.description);
});
router.post("/:dishId",(req,res)=>{
    res.send('POST operation not supported on /dishes/'+ req.params.dishId);
});
router.delete("/:dishId",(req,res)=>{
    res.send('Deleting all dishes with dish id :'+req.params.dishId);
});
module.exports = router;
//dishId