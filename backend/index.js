const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = 5000;

// Connect MongoDB
connectDB();

// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Routes
const tripRoutes = require('./routes/trip.routes');
const rideRequestRoutes = require('./routes/rideRequest.routes');

app.use('/api/trips', tripRoutes);
app.use('/api/requests', rideRequestRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('RideShare backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
