// app.js
const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json()); // For parsing JSON requests

// Example route: Get all users
app.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example route: Add a new user
app.post('/users', async (req, res) => {
  const { user_id, name, email, password_hash, created_at } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Users (user_id, name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)',
      [user_id, name, email, password_hash, created_at]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example route: Get all bookings for a user
app.get('/users/:user_id/bookings', async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM Booking_table WHERE user_id = ?', [user_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example route: Create a new booking
app.post('/bookings', async (req, res) => {
  const { booking_id, user_id, service_type, service_id, booking_date, status, total_price } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO Booking_table (booking_id, user_id, service_type, service_id, booking_date, status, total_price) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [booking_id, user_id, service_type, service_id, booking_date, status, total_price]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Example route: Get all payments
app.get('/payments', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Payment_table');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
