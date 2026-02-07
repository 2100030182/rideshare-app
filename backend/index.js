const express = require('express');
const connectDB = require('./config/db');

const app = express();
const PORT = 5000;

// connect database
connectDB();

// middleware
app.use(express.json());

// routes
const tripRoutes = require('./routes/trip.routes');

app.use('/api/trips', tripRoutes);

// test root route
app.get('/', (req, res) => {
  res.send('RideShare backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
