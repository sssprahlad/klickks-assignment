const express = require("express");
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../middleware/auth");

router.post("/", authMiddleware, (req, res) => {
    const { name, image } = req.body;
    console.log(name, image);

    if (req.user.category !== "ADMIN") {
        return res.status(403).json({
            status: false,
            error: "Access denied. Only admins can add categories"
        });
    }

    if (!name || !image) {
        return res.status(400).json({
            status: false,
            error: "Category name and image are required"
        });
    }

    db.run(
        `INSERT INTO category (name, image) VALUES (?, ?)`,
        [name, image],
        function (err) {
            if (err) {
                return res.status(400).json({ status: false, error: "Category already exists" });
            }

            res.status(201).json({
                status: true,
                message: "Category added successfully",
                categoryId: this.lastID,
                data: {
                    id: this.lastID,
                    name,
                    image
                }
            });
        }
  

    );
});

router.get("/", authMiddleware, (req, res) => {
    db.all("SELECT * FROM category", [], (err, rows) => {
        if (err) return res.status(500).json({ status: false, error: "Database error" });
        res.json(rows);
    });
});

router.delete("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    console.log(id);
    db.run("DELETE FROM category WHERE id = ?", [id], function (err) {
        if (err) return res.status(500).json({ status: false, error: "Database error" });
        res.json({ status: true, message: "Category deleted successfully" });
    });
});

router.patch("/:id", authMiddleware, (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;
    db.run("UPDATE category SET name = ?, image = ? WHERE id = ?", [name, image, id], function (err) {
        if (err) return res.status(500).json({ status: false, error: "Database error" });
        res.json({ status: true, message: "Category updated successfully"});
    });
});





module.exports = router;
