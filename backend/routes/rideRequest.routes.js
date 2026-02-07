const express = require('express');
const router = express.Router();

const {
  createRideRequest,
  getRequestsForTrip,
  updateRequestStatus
} = require('../controllers/rideRequest.controller');

// Passenger requests a ride
router.post('/', createRideRequest);

// Rider views requests for a specific trip
router.get('/trip/:tripId', getRequestsForTrip);

// Rider accepts or rejects a request
router.patch('/:requestId', updateRequestStatus);

module.exports = router;
