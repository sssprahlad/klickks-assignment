import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSnackbar } from 'notistack';  
import "./Home.css";
import { 
  Box, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  CardActions, 
  IconButton, 
  CircularProgress, 
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Add, Remove, ShoppingCart } from '@mui/icons-material';
import Badge from '@mui/material/Badge';
import { URL, GET_PRODUCTS, ADD_TO_CART, GET_CART, UPDATE_CART_ITEM, GET_CATEGORY } from '../constants/Constants';
import { setCount } from '../redux/reducer/user';

const Home = ({setUpdateProduct}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const dispatch = useDispatch();
  const [addedProductsIds, setAddedProductsIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
    autoHideDuration: 3000 
  });
  const { enqueueSnackbar } = useSnackbar();
  
  const [cartCount, setCartCount] = useState(0);
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}${GET_PRODUCTS}`);
      setProducts(response?.data || []);
      setFilteredProducts(response?.data || []);
      
      // Initialize quantities
      const initialQuantities = {};
      response?.data?.forEach(product => {
        initialQuantities[product.id] = 1; // Using 'id' instead of '_id' based on your API response
      });
      setQuantities(initialQuantities);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
      enqueueSnackbar('Failed to load products', {
        variant: 'error',
        autoHideDuration: 3000,
        backgroundColor: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  console.log(products,"products");

  const fetchCategories = async () => {
    try {
      const token = Cookies.get('jwt_token');
      if (!token) return;
      
      const response = await axios.get(`${URL}${GET_CATEGORY}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCategories(response?.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      enqueueSnackbar('Failed to load categories', {
        variant: 'error',
        autoHideDuration: 3000,
        backgroundColor: 'red',
      });
      setCategories([]);
    }
  };

  const fetchCart = async () => {
    try {
      const token = Cookies.get('jwt_token');
      if (!token) return;

      const response = await axios.get(`${URL}${GET_CART}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      const cartItems = response?.data?.items || [];
      console.log(cartItems,"cartItems in home");
      const productIds = cartItems.map(item => item?.productId?.id || item?.productId?._id).filter(Boolean);
      setAddedProductsIds(productIds);
      dispatch(setCount(cartItems.length));
    } catch (err) {
      console.error('Error fetching cart:', err);
      enqueueSnackbar('Failed to load cart', {
        variant: 'error',
        autoHideDuration: 3000,
        backgroundColor: 'red',
      });
      setAddedProductsIds([]);
      dispatch(setCount(0));
    }
  };


  useEffect(() => {

    fetchProducts();
    fetchCategories();
    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    setUpdateProduct(null);
  }, []);

  console.log(products, "products");
  console.log(filteredProducts,"filteredProducts");

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = Cookies.get('jwt_token');
      if (!token) {
        navigate('/login');
        return;
      }

      const quantity = quantities[productId] || 1;
      const isUpdating = addedProductsIds.includes(productId);

      const endpoint = isUpdating ? 
        `${UPDATE_CART_ITEM}/${productId}` : 
        `${ADD_TO_CART}/${productId}`;
        
      const response = await axios({
        method: isUpdating ? 'PUT' : 'POST',
        url: `${URL}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        data: isUpdating ? 
          { quantity: Number(quantity) } :  
          { productId, quantity: Number(quantity) } 
      });

      // setSnackbar({
      //   open: true,
      //   message: isUpdating ? 'Cart updated successfully!' : 'Product added to cart!',
      //   severity: 'success',
      //   autoHideDuration: 3000,
      //   backgroundColor: 'green',
      // }); 
      enqueueSnackbar(isUpdating ? 'Cart updated successfully!' : 'Product added to cart!', {
        variant: 'success',
        autoHideDuration: 3000,
        backgroundColor: 'green',
      }); 
     fetchCart();

      if (response.status === 200) {
        if (!isUpdating) {
          setAddedProductsIds(prev => [...prev, productId]);
          const newCount = cartCount + 1;
          setCartCount(newCount);
          dispatch(setCount(newCount));
          
        } else {
          try {
            const cartResponse = await axios.get(`${URL}${GET_CART}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            const itemCount = cartResponse.data?.products?.length || 0;
            setCartCount(itemCount);
            dispatch(setCount(itemCount));
          } catch (cartError) {
            console.error('Error fetching updated cart:', cartError);
          }
        }
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      // setSnackbar({
      //   open: true,
      //   message: error.response?.data?.message || 'Failed to update cart',
      //   severity: 'error',
      //   autoHideDuration: 3000,
      //   backgroundColor: 'red',
      // });
      enqueueSnackbar(error.response?.data?.message || 'Failed to update cart', {
        variant: 'error',
        autoHideDuration: 3000,
        backgroundColor: 'red',
      });
    }
  };

  const filterProducts = (categoryId) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.categoryid === categoryId);
      setFilteredProducts(filtered);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (loading && products.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3} textAlign="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Category Filter */}
      <Box mb={4}>
        <FormControl fullWidth variant="outlined" size="small" sx={{ maxWidth: 300, mb: 3 }}>
          <InputLabel id="category-filter">Filter by Category</InputLabel>
          <Select
            labelId="category-filter"
            value={selectedCategory}
            onChange={(e) => filterProducts(e.target.value)}
            label="Filter by Category"
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id} onClick={() => filterProducts(category.id)}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Typography variant="h6" textAlign="center" mt={4}>
            No products found in this category.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} sx={{ width: { xs: '90%', sm: 'auto' } }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.productimage || 'https://placehold.co/300x200/e2e8f0/1e293b?text=No+Image'}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://placehold.co/300x200/e2e8f0/1e293b?text=Image+Not+Found';
                    }}
                    sx={{ 
                      objectFit: 'cover',
                      backgroundColor: '#f8fafc'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3" noWrap>
                      {product.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      destination:
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      // mb: 1
                    }}>
                      {product.productdescription}
                    </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}> 
                      <Typography variant="body2" color="text.secondary">
                        price:
                      </Typography> 
                      <Typography variant="h6" color="primary" fontWeight="bold">
                      ${Number(product?.price || 0).toFixed(2)}
                    </Typography></Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Box display="flex" flexDirection="column" width="100%">
                      <Box display="flex" alignItems="center" mb={1} justifyContent="center">
                        <IconButton 
                          size="small"
                          onClick={() => handleQuantityChange(product.id, -1)}
                          disabled={quantities[product.id] <= 1}
                        >
                          <Remove fontSize="small" />
                        </IconButton>
                        <Typography mx={2} minWidth="24px" textAlign="center">
                          {quantities[product.id] || 1}
                        </Typography>
                        <IconButton 
                          size="small"
                          onClick={() => handleQuantityChange(product.id, 1)}
                        >
                          <Add fontSize="small" />
                        </IconButton>
                      </Box>
                  
                      <Button
                        fullWidth
                        variant={addedProductsIds.includes(product.id) ? 'outlined' : 'contained'}
                        color="primary"
                        startIcon={<ShoppingCart />}
                        onClick={() => handleAddToCart(product.id)}
                        size={isMobile ? 'small' : 'medium'}
                      >
                        {addedProductsIds.includes(product.id) ? 'Update Cart' : 'Add to Cart'}
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity} 
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
