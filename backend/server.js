const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const categoryRoutes = require("./routes/product_category");
const cartItemRoutes = require("./routes/cartItem");

const app = express();


const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ["https://klickks-assignment-ten.vercel.app"] 
    : ["http://localhost:3000", "http://localhost:5000"],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/admin/products", productsRoutes);
app.use("/api/admin/category", categoryRoutes);
app.use("/api/cartItem", cartItemRoutes);

app.get("/", (req, res) => {
  res.send("Backend API running with SQLite on Render");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
