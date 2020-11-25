const router = require("express").Router();
router.get("/",(req,res)=>{
    res.send('Will send all the leaders to you now!');
});
router.put("/",(req,res)=>{
    res.send('PUT operation not supported on /leaders');
});
router.post("/",(req,res)=>{
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
});
router.delete("/",(req,res)=>{
    res.send('Deleting all dishes');
});

router.get("/:leaderId",(req,res)=>{
    res.send('Will send leader with leader id: !'+req.params.leaderId);
});
router.put("/:leaderId",(req,res)=>{
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name +
        ' with details: ' + req.body.description);});
router.post("/:leaderId",(req,res)=>{
    res.send('POST operation not supported on /leaders/'+ req.params.leaderId);
});
router.delete("/:leaderId",(req,res)=>{
    res.send('Deleting all leaders with leadert id :'+req.params.leaderId);
});
module.exports = router;
//leaderId