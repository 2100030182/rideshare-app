const express = require('express');
const router = express.Router();

const {
  createTrip,
  getAllTrips,
  searchTrips
} = require('../controllers/trip.controller');

// SEARCH trips (Passenger)
router.get('/search', searchTrips);

// GET all trips
router.get('/', getAllTrips);

// CREATE trip (Rider)
router.post('/', createTrip);

module.exports = router;
