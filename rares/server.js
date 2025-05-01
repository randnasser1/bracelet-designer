const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use('/charms', express.static('charms'));

app.get('/api/charms', (req, res) => {
  const charmsDir = path.join(__dirname, 'charms');
  fs.readdir(charmsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read charm folder' });
    }
    const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));
    res.json(pngFiles);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
