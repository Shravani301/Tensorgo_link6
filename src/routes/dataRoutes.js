const express = require('express');
const router = express.Router();

// Example route to fetch data (replace with your logic)
router.get('/fetch-data', (req, res) => {
  res.json({ message: 'Data fetched successfully' });
});

module.exports = router;
