const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3000;

// JSON veri ayrıştırma
 app.use(express.json());
 app.use(express.static('public')); // Statik dosyaları sunmak için
// Veritabanı bağlantısı
const db = new sqlite3.Database(':memory:'); // Bellek üzerinde geçici veritabanı oluşturuluyor

// Tablo oluşturma
db.serialize(() => {
  db.run('CREATE TABLE todos (id INT, text TEXT)');
});

// API rotaları
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.post('/api/todos', (req, res) => {
  const { id, text } = req.body;
  db.run('INSERT INTO todos (id, text) VALUES (?, ?)', [id, text], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Todo added successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
