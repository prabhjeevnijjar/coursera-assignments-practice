const bodyParser = require("body-parser");

const router = require("express").Router();
const bodyParser = require('body-parser');
let User = require('../models/user');

router.use(bodyParser.json());
router.get("/",(req,res)=>{

});
router.put("/",(req,res)=>{

});
router.post("/",(req,res)=>{

});
router.delete("/",(req,res)=>{

});

module.exports = router;