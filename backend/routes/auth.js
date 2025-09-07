const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, category } = req.body;
  console.log(username, password, category);

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    "INSERT INTO users (username, password, category) VALUES (?, ?, ?)",
    [username, hashedPassword, category],
    function (err) {
      if (err) {
        return res.status(400).json({ error: "User already exists",status: false });
      }

      const userId = this.lastID;
      db.run("INSERT INTO carts (userid) VALUES (?)", [userId], function (err) {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ error: "Failed to create cart",status: false });
        }
      });

      res.json({ message: "User registered successfully",status: true });
    }
  );
});


router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required",status: false });
  }

  db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error",status: false });
    if (!user) return res.status(400).json({ error: "User not found",status: false });
    if (!user.password) return res.status(500).json({ error: "User password missing in DB",status: false });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials",status: false });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, category: user.category },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "1h" }
      );

      res.json({
        token,  
        category: user.category,
        userId: user.id,
        username: user.username,
        status: true
      });
    }).catch(err => {
      res.status(500).json({ error: "Password comparison failed",status: false });
    });
  });
});



// Get Users

router.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error",status: false });
    res.json(rows);
  });
});




module.exports = router;
