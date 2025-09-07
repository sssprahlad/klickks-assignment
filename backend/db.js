const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./klickks.db", (err) => {
  if (err) {
    console.error("Database connection error", err.message);
  } else {
    console.log("Connected to SQLite database");
  }
});

db.run(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    category TEXT
  )`
);

db.run(
  `CREATE TABLE IF NOT EXISTS category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    image TEXT
  )`

)

db.run(
  `CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price TEXT,
    productdescription TEXT,
    productimage TEXT,
    productstock TEXT,
    categoryid INTEGER,
    FOREIGN KEY (categoryid) REFERENCES category(id)

  )`
);

db.run(
  `CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userid INTEGER,
    FOREIGN KEY (userid) REFERENCES users(id)

  )`
);

db.run(
  `CREATE TABLE IF NOT EXISTS cartitems (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
     cartid INTEGER,
    productid INTEGER,
    quantity INTEGER,
     FOREIGN KEY (cartid) REFERENCES carts(id),
     FOREIGN KEY (productid) REFERENCES products(id)
  
  )`
);




module.exports = db;
