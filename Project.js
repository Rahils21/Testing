// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define route handler for POST requests to /bfhl
app.post('/bfhl', (req, res) => {
    // Example response data
    const responseData = {
        "is_success": true,
        "user_id": "john_doe_17091999",
        "email": "john@xyz.com",
        "roll_number": "ABCD123",
        "numbers": [],
        "alphabets": []
    };

    // Check if request body contains data array
    if (req.body && req.body.data && Array.isArray(req.body.data)) {
        // Extract numbers and alphabets from data array
        req.body.data.forEach(item => {
            if (!isNaN(item)) {
                responseData.numbers.push(String(item));
            } else if (typeof item === 'string' && /^[A-Za-z]$/.test(item)) {
                responseData.alphabets.push(item);
            }
        });
    }

    // Send the response
    res.json(responseData);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
