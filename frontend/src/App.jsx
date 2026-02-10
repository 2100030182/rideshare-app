import { useEffect, useState } from 'react'

function App() {
  const [trips, setTrips] = useState([])
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [selectedTripId, setSelectedTripId] = useState(null)
  const [requests, setRequests] = useState([])

  useEffect(() => {
    fetch('/api/trips')
      .then(res => res.json())
      .then(data => setTrips(data))
      .catch(() => setError('Failed to fetch trips'))
  }, [])

  const viewRequests = async (tripId) => {
    setError('')
    setMessage('')
    setSelectedTripId(tripId)

    try {
      const res = await fetch(`/api/requests/trip/${tripId}`)
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch requests')
      }

      setRequests(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const updateRequestStatus = async (requestId, status) => {
    setError('')
    setMessage('')

    try {
      const res = await fetch(`/api/requests/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to update request')
      }

      setMessage(`Request ${status}`)

      // Refresh requests list
      viewRequests(selectedTripId)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>🚗 RideShare App</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <h2>Trips</h2>

      {trips.length === 0 && <p>No trips available.</p>}

      <ul>
        {trips.map(trip => (
          <li key={trip._id} style={{ marginBottom: '20px' }}>
            <strong>{trip.from} → {trip.to}</strong><br />
            Date: {trip.date} | Time: {trip.time}<br />
            Seats: {trip.availableSeats}<br />

            <button onClick={() => viewRequests(trip._id)}>
              View Requests
            </button>

            {selectedTripId === trip._id && (
              <div style={{ marginTop: '10px' }}>
                <h4>Ride Requests</h4>

                {requests.length === 0 && (
                  <p>No requests for this trip.</p>
                )}

                <ul>
                  {requests.map(req => (
                    <li key={req._id} style={{ marginBottom: '10px' }}>
                      Passenger: {req.passengerName}<br />
                      Status: {req.status}<br />

                      {req.status === 'pending' && (
                        <>
                          <button
                            onClick={() =>
                              updateRequestStatus(req._id, 'accepted')
                            }
                          >
                            Accept
                          </button>{' '}
                          <button
                            onClick={() =>
                              updateRequestStatus(req._id, 'rejected')
                            }
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
