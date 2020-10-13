const mongoose = require("mongoose");
const SkateSpot = require("./models/SkateSpot");
const db = require("./config/keys").mongoURI;
const fetch = require("node-fetch");

let resultData;
let saveCounter = 0;

mongoose
  .connect(db)
  .then(() => console.log("mongodb connection success"))
  .catch(error => console.log(error));


    
const url = ['https://data.cityofnewyork.us/resource/pvvr-75zk.json']

url.map(async url => {
    try{
        const response = await fetch(url);
        const json = await response.json();
        resultData = [...json];

        for (let i = 0; i < resultData.length; i++) {
            let skateSpot = new SkateSpot({ 
                name: resultData[i].name,
                description: resultData[i].status,
                location: { coordinates: [resultData[i].polygon.coordinates[0][0][1] , resultData[i].polygon.coordinates[0][0][0]]}
            })

            skateSpot.save(() => {
                console.log("saved" + skateSpot)
                saveCounter++;
                if (saveCounter === resultData.length) {
                    mongoose
                    .disconnect()
                    .then(() => console.log("saved succesfully and mongodb disconnected"))
                    .catch(error => console.log(error));
                    }
                });
            }
    } catch (error) {
    console.log(error);
    }
})
