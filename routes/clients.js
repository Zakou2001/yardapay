const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { nom, pays } = req.body;
  db.run(
    'INSERT INTO clients (nom, pays) VALUES (?, ?)',
    [nom, pays],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send({ id: this.lastID, nom, pays });
    }
  );
});

router.get('/', (req, res) => {
  db.all('SELECT * FROM clients', (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
});

module.exports = router;
