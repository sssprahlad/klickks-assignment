// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/auth");
// const productsRoutes = require("./routes/products");
// const categoryRoutes = require("./routes/product_category");
// const cartItemRoutes = require("./routes/cartItem");

// const app = express();


// const corsOptions = {
//   origin: process.env.NODE_ENV === 'production' 
//     ? ["https://klickks-assignment-ten.vercel.app"] 
//     : ["http://localhost:3000", "http://localhost:5000"],
//   methods: ["GET","POST","PUT","DELETE","OPTIONS"],
//   allowedHeaders: ["Content-Type","Authorization"],
//   credentials: true
// };

// app.use(cors(corsOptions));

// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/admin/products", productsRoutes);
// app.use("/api/admin/category", categoryRoutes);
// app.use("/api/cartItem", cartItemRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend API running with SQLite on Render");
// });
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const productsRoutes = require("./routes/products");
const categoryRoutes = require("./routes/product_category");
const cartItemRoutes = require("./routes/cartItem");

const app = express();

// const allowedOrigins = process.env.NODE_ENV === "production"
//   ? ["https://klickks-assignment-ten.vercel.app"]
//   : ["http://localhost:3000", "http://localhost:5000"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true,
// };

const allowedOrigins = [
  'http://localhost:3000',
  'https://klickks-assignment-ten.vercel.app'
];

const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  optionsSuccessStatus: 204
};

// Enable CORS with the defined options
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Increase payload size limit to 50MB
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin/products", productsRoutes);
app.use("/api/admin/category", categoryRoutes);
app.use("/api/cartItem", cartItemRoutes);

app.get("/", (req, res) => {
  res.send("Backend API running with SQLite on Render");
});

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


const closeServer = () => {
  if (server) {
    server.close();
  }
};


process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection Error:', err);
  closeServer();
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception Error:', err);
  closeServer();
  process.exit(1);
});


server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Trying alternative port...`);
  
    const altPort = parseInt(PORT) + 1;
    const altServer = app.listen(altPort, () => {
      console.log(`Server started on alternative port ${altPort}`);
    });
    
    altServer.on('error', (altError) => {
      console.error(`Failed to start on port ${altPort}:`, altError.message);
      process.exit(1);
    });
  } else {
    console.error('Server error:', error);
    process.exit(1);
  }
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  closeServer();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully');
  closeServer();
  process.exit(0);
});

// Export the server and close function for testing
module.exports = { server, closeServer };
