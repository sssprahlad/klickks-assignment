import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { useState, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import { useMediaQuery } from '@mui/material';
import theme from './theme';
import Layout from './components/Layout/Layout';
import Login from './components/UserDetails/Login/Login';
import Register from './components/UserDetails/Register/Register';
import ProtectedRoute from './components/Protect/ProtectedRoute';
import PublicRoute from './components/Protect/PublicRoute';
import Home from './components/Home/Home';
import AddCategory from './components/Admin/AddCategorys/AddCategorys';
import CategoriesList from './components/Admin/AddCategorys/CategoriesList/CategoriesList';
import AddProducts from './components/Admin/AddProducts/AddProducts';
import ProductsList from './components/Admin/AddProducts/ProductsList/ProductsList';
import Cart from './components/Cart/Cart';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import OrderSuccess from './components/OrderSuccess/OrderSuccess';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const[updateProduct, setUpdateProduct] = useState(null);

  console.log(updateProduct,"updateProduct");



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider 
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
      >
        <BrowserRouter>
          <ScrollToTop setUpdateProduct={setUpdateProduct}>
            <Layout isMobile={isMobile}>
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
                <Route path="/" element={<Home setUpdateProduct={setUpdateProduct}/>} />
                <Route path="/home" element={<Home  setUpdateProduct={setUpdateProduct}/>} />
                <Route path="/add-category" element={<AddCategory  setUpdateProduct={setUpdateProduct}/>} />
                <Route path="/categories-list" element={<CategoriesList setUpdateProduct={setUpdateProduct}/>} />
                <Route path="/add-product" element={<AddProducts updateProduct={updateProduct}  />} />
                <Route path="/products-list" element={<ProductsList  setUpdateProduct={setUpdateProduct} />} />
                <Route path="/cart" element={<Cart setUpdateProduct={setUpdateProduct} />} />
                <Route path="/about" element={<About setUpdateProduct={setUpdateProduct} />} />
                <Route path="/contact" element={<Contact setUpdateProduct={setUpdateProduct} />} />
                <Route path="/order-success" element={<OrderSuccess setUpdateProduct={setUpdateProduct} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
              </Routes>
            </Layout>
          </ScrollToTop>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
