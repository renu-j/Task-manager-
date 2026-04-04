const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const app        = express();
const taskRoutes = require('./routes/tasks');

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../frontend')));
app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});