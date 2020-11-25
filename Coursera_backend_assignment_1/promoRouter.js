const router = require("express").Router();
router.get("/",(req,res)=>{
    res.send('Will send all the dishes to you now!');
});
router.put("/",(req,res)=>{
    res.send('PUT operation not supported on /promotions');
});
router.post("/",(req,res)=>{
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
});
router.delete("/",(req,res)=>{
    res.send('Deleting all dishes');
});

router.get("/:promoId",(req,res)=>{
    res.send('Will send promotions with promotions id: !'+req.params.promoId);
});
router.put("/:promoId",(req,res)=>{
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name +
        ' with details: ' + req.body.description);
    });
router.post("/:promoId",(req,res)=>{
    res.send('POST operation not supported on /promotions/'+ req.params.promoId);
});
router.delete("/:promoId",(req,res)=>{
    res.end('Deleting promotion: ' + req.params.promoId);
});
module.exports = router;
//promoId