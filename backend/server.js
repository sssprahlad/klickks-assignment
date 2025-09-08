const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const categoryRoutes = require("./routes/product_category");
const cartItemRoutes = require("./routes/cartItem");

const app = express();


app.use(cors({
  origin: ["http://localhost:3000", "https://your-frontend.onrender.com"],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin/products", productsRoutes);
app.use("/api/admin/category", categoryRoutes);
app.use("/api/cartItem", cartItemRoutes);

app.get("/", (req, res) => {
  res.send("Backend API running with SQLite");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
