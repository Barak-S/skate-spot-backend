const { response } = require("express");
const express = require("express");
const router = express.Router();

const SkateSpot = require("../../models/SkateSpot");

router.get('/', (req, res)=>{
  SkateSpot.find({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
})

router.get('/myspots/:id', (req,res)=>{
  res.send(req.params.id)
})

router.post('/create', (req,res)=>{
    let newSpot = new SkateSpot(req.body.newSpot)    
    newSpot.save()
    .then(newPark => res.send(newPark))
    .catch(error => console.log(error));
})

router.get('/:id',(req,res)=>{
  SkateSpot.findById(req.params.id, function (err, docs) { 
    if (err){ 
        console.log(err); 
    } 
    else{ 
        res.send(docs)
    } 
  }) 
})

router.put('/:id/like',(req,res)=>{
  SkateSpot.findByIdAndUpdate(
    { _id: req.params.id },
    { $inc: {likes:1} },
    function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
})


module.exports = router;
