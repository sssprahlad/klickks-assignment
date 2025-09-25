const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/auth");


router.post("/", authMiddleware, (req, res) => {
  const { name, price, productdescription, productimage, productstock, categoryid } = req.body;

  if (req.user.category !== "ADMIN") {
    return res.status(403).json({
      success: false,
      error: "Access denied. Only admins can add products"
    });
  }

  if (!name || !price || !productdescription || !productstock || !categoryid) {
    return res.status(400).json({
      success: false,
      error: "All fields are required"
    });
  }

  db.run(
    `INSERT INTO products (name, price, productdescription, productimage, productstock, categoryid) VALUES(?,?,?,?,?,?)`,
    [name, price, productdescription, productimage, productstock, categoryid],
    function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          error: "Product already exists or database error"
        });
      }

      res.status(201).json({
        status: true,
        message: "Product added successfully",
        productId: this.lastID,
        data: {
          id: this.lastID,
          name,
          price,
          productdescription,
          productimage,
          productstock,
          categoryid
        }
      });
    }
  );
});  


router.get("/", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(rows);
  });
});

router.delete("/:id", authMiddleware, (req, res) => {
  const productId = req.params.id;
  db.run("DELETE FROM products WHERE id = ?", [productId], function (err) {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true, message: "Product deleted successfully" });
  });
});

router.patch("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const { name, price, productdescription, productimage, productstock, categoryid } = req.body;
  db.run("UPDATE products SET name = ?, price = ?, productdescription = ?, productimage = ?, productstock = ?, categoryid = ? WHERE id = ?", [name, price, productdescription, productimage, productstock, categoryid, id], function (err) {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true, message: "Product updated successfully" });
  });
});



module.exports = router;
