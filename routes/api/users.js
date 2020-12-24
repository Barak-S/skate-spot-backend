const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const verifyUserAndUpdate = require("../../validation/verify");

const User = require("../../models/User");
const SkateSpot = require("../../models/SkateSpot");

router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
// Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.get('/:id', (req, res)=>{
  User.findById(req.params.id, function (err, docs) { 
    if (err){ 
        console.log(err); 
    } 
    else{ 
        res.json(docs)
    } 
  }) 
})


router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {

    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/verify", async (req, res) => {
  const { errors, isValid } = verifyUserAndUpdate(req.body);
  if (!isValid) {
    return res.json(errors);
  } else {
    const email = req.body.email;
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
  
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    } 
    const validPassword = await bcrypt.compare(oldPassword, user.password)
    if (!validPassword){
      errors.oldPassword = "wrong password";
      return res.json(errors);
    }
    if (validPassword) {
      if(newPassword.length > 3){
        bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
            console.log(err)
          } 
          user.password = hash;
          user
            .save()
            .then(resp => res.json(resp))
            .catch(err => console.log(err));
        });
      } else {
        errors.newPassword = "password must be longer than 3 characters";
        return res.json(errors);
      }
    } 
  }
})


router.get('/:id/myspots', (req,res)=>{
  User.findById(req.params.id, function (err, docs) { 
    if (err){ 
      console.log(err); 
    } 
    else{ 
      SkateSpot.find({postedBy: req.params.id} ,function(err,docs){
        res.send(docs)
      })
    } 
  })   
})

module.exports = router;