# Klickks Backend

This is the backend server for the Klickks e-commerce platform, built with Node.js, Express, and SQLite.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- SQLite3

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Klickks-Assignment/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all the required packages including:
   - express
   - sqlite3
   - jsonwebtoken
   - bcryptjs
   - cors
   - dotenv
   - multer

3. **Environment Setup**
   Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=3001
   JWT_SECRET=your_jwt_secret_key
   DATABASE_URL=./database.sqlite
   UPLOAD_DIR=./uploads
   ```

4. **Initialize the Database**
   The database will be automatically created when you start the server for the first time.

## Running the Application

1. **Start the development server**
   ```bash
   node server.js (or) npm start
   ```
   This will start the server on the specified port (default: 3001).

<!-- 2. **For development with auto-reload**
   ```bash
   npm run dev
   ```
   (Make sure you have nodemon installed globally or as a dev dependency) -->

## Project Structure

```
backend/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── middleware/       # Custom middleware
├── models/           # Database models
├── routes/           # API routes
├── uploads/          # File uploads directory
├── .env              # Environment variables
├── .gitignore        # Git ignore file
├── package.json      # Project dependencies
└── server.js         # Entry point
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product (Admin only)
- `GET /api/products/:id` - Get product by ID

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category (Admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

## Environment Variables

- `PORT` - Port number for the server (default: 3001)
- `JWT_SECRET` - Secret key for JWT token generation
- `DATABASE_URL` - Path to SQLite database file
- `UPLOAD_DIR` - Directory for file uploads

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
