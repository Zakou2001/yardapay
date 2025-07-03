const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./yardapay.db');

db.serialize(() => {
  // Table clients
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nom TEXT,
      pays TEXT
    )
  `);

  // Table transferts
  db.run(`
    CREATE TABLE IF NOT EXISTS transferts (
      id TEXT PRIMARY KEY,
      client_id INTEGER,
      montant_envoye REAL,
      frais REAL,
      montant_recu REAL,
      date TEXT,
      pays_origine TEXT,
      pays_destination TEXT,
      moyen TEXT,
      FOREIGN KEY(client_id) REFERENCES clients(id)
    )
  `);
});

module.exports = db;
