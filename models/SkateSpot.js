const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkateSpotSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
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
  },
  features: {
    type: Array
  },
  likes:{
    type: Number
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    text: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  }]
});

module.exports = SkateSpot = mongoose.model("skatespots", SkateSpotSchema);