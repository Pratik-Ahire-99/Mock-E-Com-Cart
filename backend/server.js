// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { db, init } = require('./db');

// Initialize database
init();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static image files from /public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ✅ GET /api/products - include image URLs
app.get('/api/products', (req, res) => {
  const rows = db.prepare('SELECT id, name, price, description, image FROM products').all();

  // Add full absolute URL for images
  const fullRows = rows.map((r) => ({
    ...r,
    image: `${req.protocol}://${req.get('host')}${r.image}`
  }));

  res.json(fullRows);
});

// ✅ GET /api/cart - include product images and total
app.get('/api/cart', (req, res) => {
  const items = db
    .prepare(`
      SELECT c.id, c.qty, p.id as productId, p.name, p.price, p.image
      FROM cart c
      JOIN products p ON p.id = c.productId
    `)
    .all();

  const total = items.reduce((sum, it) => sum + it.qty * it.price, 0);

  const fullItems = items.map((it) => ({
    ...it,
    image: `${req.protocol}://${req.get('host')}${it.image}`
  }));

  res.json({ items: fullItems, total });
});

// ✅ POST /api/cart - add item { productId, qty }
app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty || qty <= 0)
    return res.status(400).json({ error: 'productId & qty required' });

  const exists = db.prepare('SELECT id, qty FROM cart WHERE productId = ?').get(productId);
  if (exists) {
    const newQty = exists.qty + qty;
    db.prepare('UPDATE cart SET qty = ? WHERE id = ?').run(newQty, exists.id);
    const updated = db.prepare('SELECT * FROM cart WHERE id = ?').get(exists.id);
    return res.status(200).json(updated);
  } else {
    const info = db.prepare('INSERT INTO cart (productId, qty) VALUES (?, ?)').run(productId, qty);
    const newRow = db.prepare('SELECT * FROM cart WHERE id = ?').get(info.lastInsertRowid);
    return res.status(201).json(newRow);
  }
});

// ✅ DELETE /api/cart/:id - remove item
app.delete('/api/cart/:id', (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare('DELETE FROM cart WHERE id = ?').run(id);
  if (info.changes === 0) return res.status(404).json({ error: 'not found' });
  res.status(204).send();
});

// ✅ PATCH /api/cart/:id - update quantity
app.patch('/api/cart/:id', (req, res) => {
  const id = Number(req.params.id);
  const { qty } = req.body;
  if (!qty || qty <= 0)
    return res.status(400).json({ error: 'qty must be > 0' });

  const info = db.prepare('UPDATE cart SET qty = ? WHERE id = ?').run(qty, id);
  if (info.changes === 0) return res.status(404).json({ error: 'not found' });
  const row = db.prepare('SELECT * FROM cart WHERE id = ?').get(id);
  res.json(row);
});

// ✅ POST /api/checkout - mock checkout & clear cart
app.post('/api/checkout', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ error: 'name & email required' });

  const items = db
    .prepare(`
      SELECT c.qty, p.name, p.price, (c.qty * p.price) as subtotal
      FROM cart c
      JOIN products p ON p.id = c.productId
    `)
    .all();

  if (items.length === 0)
    return res.status(400).json({ error: 'cart is empty' });

  const total = items.reduce((sum, it) => sum + it.subtotal, 0);

  const receipt = {
    id: 'R-' + Date.now(),
    name,
    email,
    items,
    total,
    timestamp: new Date().toISOString()
  };

  db.prepare('DELETE FROM cart').run(); // clear cart

  res.json({ receipt });
});

// ✅ Health check
app.get('/api/health', (req, res) => res.send({ ok: true }));

// ✅ Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend started on http://localhost:${PORT}`));
