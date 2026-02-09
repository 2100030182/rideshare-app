import { useEffect, useState } from 'react';

function App() {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [selectedTripId, setSelectedTripId] = useState(null);
  const [passengerName, setPassengerName] = useState('');
  const [passengerContact, setPassengerContact] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/trips')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch trips');
        }
        return response.json();
      })
      .then((data) => {
        setTrips(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const submitRequest = () => {
    setError('');
    setSuccess('');

    if (!passengerName || !passengerContact) {
      setError('Please enter name and contact');
      return;
    }

    fetch('http://localhost:5000/api/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tripId: selectedTripId,
        passengerName,
        passengerContact
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit request');
        }
        return response.json();
      })
      .then(() => {
        setSuccess('Ride request sent successfully!');
        setPassengerName('');
        setPassengerContact('');
        setSelectedTripId(null);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🚗 RideShare App</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <h2>Available Trips</h2>

      {trips.length === 0 && <p>No trips available.</p>}

      <ul>
        {trips.map((trip) => (
          <li key={trip._id} style={{ marginBottom: '20px' }}>
            <strong>{trip.from}</strong> → <strong>{trip.to}</strong>
            <br />
            Date: {trip.date} | Time: {trip.time}
            <br />
            Seats: {trip.availableSeats}
            <br />

            <button onClick={() => setSelectedTripId(trip._id)}>
              Request Ride
            </button>

            {selectedTripId === trip._id && (
              <div style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  placeholder="Your Contact"
                  value={passengerContact}
                  onChange={(e) => setPassengerContact(e.target.value)}
                />
                <br />
                <button onClick={submitRequest}>Submit Request</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
