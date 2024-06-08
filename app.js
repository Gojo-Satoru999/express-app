const express = require('express');
const app = express();

// Custom middleware to verify request time
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hourOfDay = date.getHours();

  // Check if it's a weekday and within working hours
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
    next(); // Continue with the request
  } else {
    res.send('Sorry, the website is only available during working hours (Monday to Friday, 9AM to 5PM).');
  }
};

// Middleware to serve static files (CSS)
app.use(express.static('public'));

// Use the custom middleware for all routes
app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
