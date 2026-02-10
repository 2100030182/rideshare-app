const RideRequest = require('../models/RideRequest')

// Passenger creates a ride request
exports.createRideRequest = async (req, res) => {
  try {
    const { trip, passengerName, passengerContact } = req.body

    if (!trip || !passengerName || !passengerContact) {
      return res.status(400).json({
        message: 'All fields are required'
      })
    }

    const rideRequest = new RideRequest({
      trip,
      passengerName,
      passengerContact,
      status: 'pending'
    })

    const savedRequest = await rideRequest.save()

    res.status(201).json(savedRequest)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create ride request',
      error: error.message
    })
  }
}

// Rider views all requests for a specific trip
exports.getRequestsByTrip = async (req, res) => {
  try {
    const { tripId } = req.params

    const requests = await RideRequest.find({ trip: tripId })

    res.status(200).json(requests)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch requests',
      error: error.message
    })
  }
}

// Rider accepts or rejects a request
exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params
    const { status } = req.body

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        message: 'Status must be accepted or rejected'
      })
    }

    const updatedRequest = await RideRequest.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    )

    if (!updatedRequest) {
      return res.status(404).json({
        message: 'Request not found'
      })
    }

    res.status(200).json(updatedRequest)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update request',
      error: error.message
    })
  }
}
