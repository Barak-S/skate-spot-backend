const { response } = require("express");
const express = require("express");
const router = express.Router();

const SkateSpot = require("../../models/SkateSpot");


router.get('/skatespots', (req, res)=>{

    SkateSpot.find({}, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
      });
})

router.post('/skatespots/create', (req,res)=>{
    // console.log(req.body.newSpot)
    let newSpot = new SkateSpot(req.body.newSpot)    
    newSpot.save()
    // .then(() => console.log("saved NEW PARK succesfully", newSpot))
    .then(newPark => res.send(newPark))
    .catch(error => console.log(error));

})

router.get('/skatespots/:id',(req,res)=>{
  SkateSpot.findById(req.params.id, function (err, docs) { 
    if (err){ 
        console.log(err); 
    } 
    else{ 
        res.send(docs)
    } 
  }) 
})

router.put('/skatespots/:id/like',(req,res)=>{
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
