const express = require('express');
const router  = express.Router();
const db      = require('../config/db');

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM tasks ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { text, priority } = req.body;
  const sql = 'INSERT INTO tasks (text, priority) VALUES (?, ?)';
  db.query(sql, [text, priority], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({
      id:        result.insertId,
      text:      text,
      priority:  priority,
      completed: false
    });
  });
});

router.put('/:id', (req, res) => {
  const { completed } = req.body;
  const sql = 'UPDATE tasks SET completed = ? WHERE id = ?';
  db.query(sql, [completed, req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task updated successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted successfully' });
  });
});

module.exports = router;