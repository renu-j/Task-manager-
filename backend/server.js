const express = require('express');
const cors    = require('cors');
require('dotenv').config();

const app        = express();
const taskRoutes = require('./routes/tasks');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});