const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// In-memory "database"
let users = [];

// Create a user (POST)
app.post('/users', (req, res) => {
    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
    };
    users.push(user);
    res.status(201).json(user);
});

// Read all users (GET)
app.get('/users', (req, res) => {
    res.json(users);
});

// Read a single user by ID (GET)
app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

// Update a user (PUT)
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');

    user.name = req.body.name;
    user.email = req.body.email;
    res.json(user);
});

// Delete a user (DELETE)
app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found');

    users.splice(userIndex, 1);
    res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Run the API
// Start the Server  : node server.js

// Test the API You can test the API using tools like Postman or curl. Here are the available endpoints:

// Create a User
// Method: POST
// URL: http://localhost:3000/users
// Body:
// {
//     "name": "John Doe",
//     "email": "john.doe@example.com"
// }

// Get All Users
// Method: GET
// URL: http://localhost:3000/users

// Get a User by ID
// Method: GET
// URL: http://localhost:3000/users/1

// Update a User
// Method: PUT
// URL: http://localhost:3000/users/1
// Body:
// {
//     "name": "Jane Doe",
//     "email": "jane.doe@example.com"
// }

// Delete a User
// Method: DELETE
// URL: http://localhost:3000/users/1