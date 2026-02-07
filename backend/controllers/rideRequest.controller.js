const RideRequest = require('../models/RideRequest');

// POST /api/requests - passenger requests a ride
const createRideRequest = async (req, res) => {
  try {
    const { tripId, passengerName, passengerContact } = req.body;

    const request = new RideRequest({
      trip: tripId,
      passengerName,
      passengerContact
    });

    await request.save();

    res.status(201).json({
      message: 'Ride request sent successfully',
      request
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create ride request',
      error: error.message
    });
  }
};

// GET /api/requests/trip/:tripId - rider views requests for a trip
const getRequestsForTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const requests = await RideRequest.find({ trip: tripId });

    // Hide passenger contact unless accepted
    const sanitizedRequests = requests.map((reqItem) => {
      const reqObj = reqItem.toObject();

      if (reqObj.status !== 'accepted') {
        delete reqObj.passengerContact;
      }

      return reqObj;
    });

    res.status(200).json(sanitizedRequests);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch ride requests',
      error: error.message
    });
  }
};

// PATCH /api/requests/:requestId - accept or reject request
const updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const request = await RideRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    res.status(200).json({
      message: 'Request status updated',
      request
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update request status',
      error: error.message
    });
  }
};

module.exports = {
  createRideRequest,
  getRequestsForTrip,
  updateRequestStatus
};
