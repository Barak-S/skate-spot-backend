const { response } = require("express");
const express = require("express");
const router = express.Router();

const SkateSpot = require("./models/SkateSpot");

const app = express()

app.get('/skatespots', (req, res)=>{
    res.send("knarly spots!")
})


module.exports = router;