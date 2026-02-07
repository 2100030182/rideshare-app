const express = require('express');
const router = express.Router();

const {
  createTrip,
  getAllTrips
} = require('../controllers/trip.controller');

// GET all trips
router.get('/', getAllTrips);

// POST create trip
router.post('/', createTrip);

module.exports = router;
