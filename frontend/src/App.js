import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/UserDetails/Login/Login";
import Register from "./components/UserDetails/Register/Register";
import ProtectedRoute from "./components/Protect/ProtectedRoute";
import PublicRoute from "./components/Protect/PublicRoute";
import Home from "./components/Home/Home";
import AddCategory from "./components/Admin/AddCategorys/AddCategorys";
import CategoriesList from "./components/Admin/AddCategorys/CategoriesList/CategoriesList";
import AddProducts from "./components/Admin/AddProducts/AddProducts";
import ProductsList from "./components/Admin/AddProducts/ProductsList/ProductsList";
import Cart from "./components/Cart/Cart";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import OrderSuccess from "./components/OrderSuccess/OrderSuccess";

function App() {
  return (
    <div className="App"> 
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/categories-list" element={<CategoriesList />} />
          <Route path="/add-product" element={<AddProducts />} />
          <Route path="/products-list" element={<ProductsList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
