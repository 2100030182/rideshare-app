const mongoose = require('mongoose');

const rideRequestSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trip',
      required: true
    },
    passengerName: {
      type: String,
      required: true
    },
    passengerContact: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('RideRequest', rideRequestSchema);
