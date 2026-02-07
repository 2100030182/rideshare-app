const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    availableSeats: {
      type: Number,
      required: true
    },
    riderName: {
      type: String,
      required: true
    },
    riderContact: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Trip', tripSchema);
