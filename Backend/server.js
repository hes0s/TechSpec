const express = require('express');
const cors = require('cors');  
const app = express();
const fs = require('fs');

app.use(cors());

app.get('/itemdata', (req, res) => {
  fs.readFile('data/ItemData.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'File not found' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});