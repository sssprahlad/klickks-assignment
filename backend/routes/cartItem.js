const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/auth");
const { route } = require("./auth");


router.post("/:productid", authMiddleware, (req, res) => {
    const { quantity } = req.body;
    const productid = req.params.productid;
    const userid = req.user.id;


    db.get(
        `SELECT * FROM products WHERE id = ?`,
        [productid],
        function (err, row) {

            if (err) return res.status(500).json({ error: "Database error" });
            if (!row) return res.status(404).json({ error: productid + " Product not available" });
        
        }
    )

  

    db.run(
        `INSERT INTO cartitems (cartid, productid, quantity) VALUES (?, ?, ?)`,
        [userid, productid, quantity],
        function (err) {
            if (err) {
                return res.status(400).json({ error: "Failed to add to cart" });
            }
            res.status(201).json({ message: "Product added to cart successfully", id: this.lastID });
        }
    );
    
})



router.put("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    console.log(id, quantity);
    db.run("UPDATE cartitems SET quantity = ? WHERE id = ?", [quantity, id], function (err) {
        if (err) return res.status(500).json({ status: false, error: "Database error" });
        res.json({ status: true, message: "Cart item updated successfully", id:this.lastID });
    });
});










router.delete("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    db.run("DELETE FROM cartitems WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ status: false, error: "Database error" });
        res.json({ status: true, message: "Cart item deleted successfully", id:this.lastID });
    });
});



router.get("/cart", authMiddleware, (req, res) => {
    const userid = req.user.id;
  
    db.all(
      `SELECT c.id, c.productid, c.quantity, p.name, p.price, p.productimage 
       FROM cartitems c 
       JOIN products p ON c.productid = p.id 
       WHERE c.cartid = ?`,
      [userid],
      (err, rows) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }
  
        if (!rows || rows.length === 0) {
          return res.json({ message: "Cart is empty", items: [] });
        }
  
        return res.json({ items: rows });
      }
    );
  });
  



module.exports = router;