const healthCheck = (req, res) => {
  res.send('RideShare backend is running');
};

module.exports = {
  healthCheck
};
