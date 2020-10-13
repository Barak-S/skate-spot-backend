const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkateSpotSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  }
});

module.exports = SkateSpot = mongoose.model("skateSpots", SkateSpotSchema);