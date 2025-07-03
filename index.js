const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/clients', require('./routes/clients'));
app.use('/api/transferts', require('./routes/transferts'));

app.listen(PORT, () => {
  console.log(`✅ Serveur Yardapay démarré sur http://localhost:${PORT}`);
});
