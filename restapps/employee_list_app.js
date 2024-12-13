const mongoose = require('mongoose');
const Employees = require('./employee');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

//Replace the password in the line below
const uri =  "mongodb://localhost:27017";

mongoose.connect(uri,{'dbName':'employeeDB'});


// Middleware to parse JSON requests
app.use("*",bodyParser.json());

app.get('/', (req, res) => {
  console.log("res", res);
  res.send('Welcome to the API server!');
});


// GET endpoint
app.get('/api/employees', async (req, res) => {
    const documents = await Employees.find();
    res.json(documents);
});

app.post('/api/add_employee', async (req, res) => {
  console.log("reqdata123-----", req);
  const data = req.body;
    const emp = new Employees({
      "emp_name": data['name'],
      "age": data['age'],
      "location": data['location'],
      "email": data['email']
    });
    // Save the employee to the database
    await emp.save();
    res.json({ message: 'Employee added successfully', emp });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Enable CORS for all routes
app.use(cors());