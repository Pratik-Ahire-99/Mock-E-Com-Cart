// db.js — sets up SQLite DB and tables, exports DB helper
const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'db.sqlite'));

function init() {
  db.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      description TEXT,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS cart (
      id INTEGER PRIMARY KEY,
      productId INTEGER NOT NULL,
      qty INTEGER NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(productId) REFERENCES products(id) ON DELETE CASCADE
    );
  `);

  // ✅ seed local image paths if empty
  const row = db.prepare('SELECT COUNT(*) as c FROM products').get();
  if (row.c === 0) {
    const insert = db.prepare('INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)');
    const items = [
      ['Classic Tee', 199.0, 'Cotton tee, unisex', '/images/classic-tee.jpg'],
      ['Slim Jeans', 1299.0, 'Stretch denim', '/images/jeans.jpg'],
      ['Sneakers', 3299.0, 'Comfort running shoe', '/images/sneakers.jpg'],
      ['Cap', 399.0, 'Adjustable cap', '/images/cap.jpg'],
      ['Backpack', 1899.0, 'Daypack, 20L', '/images/backpack.jpg'],
      ['Socks (3 pack)', 299.0, 'Breathable socks', '/images/socks.jpg'],
      ['Sunglasses', 999.0, 'UV protection', '/images/sunglasses.jpg'],
      ['Water Bottle', 499.0, '500ml stainless steel', '/images/bottle.jpg']
    ];
    const insertMany = db.transaction((items) => {
      for (const it of items) insert.run(...it);
    });
    insertMany(items);
    console.log('🪄 Seeded products with local image paths.');
  }
}

module.exports = { db, init };
