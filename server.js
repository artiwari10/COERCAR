const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const mongoUrl = 'mongodb://localhost:27017'; // Update with your MongoDB connection URL
const dbName = 'anmol'; // Update with your database name

// Middleware to parse JSON data
app.use(express.json());

// Connect to the MongoDB database
MongoClient.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database');
  const db = client.db(dbName);

  // Endpoint to handle login form submission
  app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Store email and password in the database
    db.collection('users').insertOne({ email, password }, (err, result) => {
      if (err) {
        console.error('Error storing data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      console.log('Data stored successfully:', result);
      res.status(200).json({ message: 'Data stored successfully' });
    });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
