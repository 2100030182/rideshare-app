const express = require('express')
const router = express.Router()

const {
  createRideRequest,
  getRequestsByTrip,
  updateRequestStatus
} = require('../controllers/rideRequest.controller')

// Passenger creates a request
router.post('/', createRideRequest)

// Rider views all requests for a trip
router.get('/trip/:tripId', getRequestsByTrip)

// Rider accepts or rejects a request
router.patch('/:requestId', updateRequestStatus)

module.exports = router
