const express = require('express');
const app = express();

app.use(express.json());

app.get('/api', async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'City query parameter is required' });
  }

  try {
    const response = await fetch(`https://weather-api-go-zo1w.onrender.com/api?q=${q}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = app;
