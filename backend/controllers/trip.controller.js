const Trip = require('../models/Trip');

// POST /api/trips - create a trip
const createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();

    res.status(201).json({
      message: 'Trip created successfully',
      trip
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create trip',
      error: error.message
    });
  }
};

// GET /api/trips - get all trips
const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch trips',
      error: error.message
    });
  }
};

module.exports = {
  createTrip,
  getAllTrips
};
