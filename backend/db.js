const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to the SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'klickks.db'), (err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    // Enable foreign key constraints
    db.get("PRAGMA foreign_keys = ON");
  }
});

// Create tables if they don't exist
const createTables = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    category TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    image TEXT
  );
  
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    productdescription TEXT,
    productimage TEXT,
    productstock TEXT,
    categoryid INTEGER,
    FOREIGN KEY (categoryid) REFERENCES category(id)
  );
  
  CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES users(id)
  );
  
  CREATE TABLE IF NOT EXISTS cartitems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cartid INTEGER NOT NULL,
    productid INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY (cartid) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (productid) REFERENCES products(id) ON DELETE CASCADE
  );
  
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userid) REFERENCES users(id)
  );
  
  CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    price_at_purchase REAL NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`;

// Execute the table creation queries
db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON');
  
  // Split the SQL statements and execute them one by one
  const statements = createTables.split(';').filter(statement => statement.trim() !== '');
  
  statements.forEach(statement => {
    db.run(statement + ';', (err) => {
      if (err) {
        console.error('Error executing SQL:', statement);
        console.error(err.message);
      }
    });
  });
  
  console.log('Database tables verified/created successfully');
});




module.exports = db;
