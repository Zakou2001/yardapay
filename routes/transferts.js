const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.post('/', (req, res) => {
  const {
    client_id,
    montant_envoye,
    pays_origine,
    pays_destination,
    moyen
  } = req.body;

  const id = 'TRF-' + uuidv4().slice(0, 8).toUpperCase();
  const date = new Date().toISOString().split('T')[0];
  const frais = montant_envoye * 0.05;
  const montant_recu = montant_envoye - frais;

  db.run(
    `INSERT INTO transferts 
      (id, client_id, montant_envoye, frais, montant_recu, date, pays_origine, pays_destination, moyen)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, client_id, montant_envoye, frais, montant_recu, date, pays_origine, pays_destination, moyen],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send({ id, date, frais, montant_recu });
    }
  );
});

router.get('/', (req, res) => {
  const { date, client_id } = req.query;

  let sql = `
    SELECT transferts.*, clients.nom as client_nom
    FROM transferts
    JOIN clients ON clients.id = transferts.client_id
    WHERE 1=1
  `;
  let params = [];

  if (date) {
    sql += ' AND date = ?';
    params.push(date);
  }
  if (client_id) {
    sql += ' AND client_id = ?';
    params.push(client_id);
  }

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.send(rows);
  });
});


module.exports = router;
