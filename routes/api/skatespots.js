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
    .then(() => console.log("saved NEW PARK succesfully", newSpot))
    .catch(error => console.log(error));

})


module.exports = router;