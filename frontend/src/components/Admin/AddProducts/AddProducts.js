import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { URL, ADD_PRODUCT, GET_CATEGORY } from '../../constants/Constants';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  Divider,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  ArrowBack as ArrowBackIcon, 
  Save as SaveIcon, 
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

const AddProducts = ({ updateProduct, setUpdateProduct }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    productdescription: '',
    price: '',
    productimage: '',
    categoryid: '',
    productstock: ''
  });
  
  const [imagePreview, setImagePreview] = useState('');
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({
          ...prev,
          productimage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Basic validation
    if (!formData.name || !formData.categoryid || !formData.price) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(URL + ADD_PRODUCT + (updateProduct ? `/${updateProduct.id}` : ''), {
        method: updateProduct ? 'PATCH' : 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${Cookies.get('jwt_token')}` 
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          productstock: parseInt(formData.productstock) || 0
        }),
      });

      const result = await response.json();
      setFormData({
        name: '',
        productdescription: '',
        price: '',
        productimage: '',
        categoryid: '',
        productstock: ''
      });
      setImagePreview('');
      
      setUpdateProduct(null);
      if (!response.ok) {
        throw new Error(result.message || 'Failed to add product');
      }
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Product added successfully!',
        severity: 'success'
      });
    
      setFormData({
        name: '',
        productdescription: '',
        price: '',
        productimage: '',
        categoryid: '',
        productstock: ''
      });
      setImagePreview('');
      
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
      
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err.message || 'An error occurred while adding the product');
      setSnackbar({
        open: true,
        message: err.message || 'Failed to add product',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(URL + GET_CATEGORY, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('jwt_token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setSnackbar({
        open: true,
        message: 'Failed to load categories',
        severity: 'error'
      });
    }
  };

  useEffect(() => {
   
   setUpdateProduct(null); 
    fetchCategories();
  }, []);

  useEffect(() => {
    if (updateProduct) {
      setFormData({
        name: updateProduct.name,
        productdescription: updateProduct.productdescription,
        price: updateProduct.price,
        productimage: updateProduct.productimage,
        categoryid: updateProduct.categoryid,
        productstock: updateProduct.productstock
      });
      setImagePreview(updateProduct.productimage);
    }
  }, [updateProduct]);  

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ 
            mb: 2,
            textTransform: 'none',
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'transparent',
              color: theme.palette.primary.main,
            }
          }}
        >
          Back to Products
        </Button>
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              color: theme.palette.primary.main,
              mb: 1,
              fontSize: { xs: '1.75rem', sm: '2.125rem' }
            }}
          >
            Add New Product
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
              fontSize: { xs: '0.875rem', sm: '1rem' },
              maxWidth: '600px'
            }}
          >
            Fill in the product details below. All fields marked with * are required.
          </Typography>
        </Box>
      </Box>

      <Paper 
  elevation={2}
  sx={{ 
    p: { xs: 2, sm: 3, md: 4 },
    borderRadius: 2,
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  }}
>
  <form onSubmit={handleSubmit}>
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Card 
          variant="outlined"
          sx={{ 
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardHeader 
            title="Product Information" 
            titleTypographyProps={{
              variant: 'h6',
              fontWeight: 600,
            }}
            sx={{ 
              borderBottom: `1px solid ${theme.palette.divider}`,
              py: 2,
              px: { xs: 2, sm: 3 },
              backgroundColor: theme.palette.background.default,
            }}
            action={
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                sx={{ 
                  mt: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  px: { xs: 2, sm: 3 },
                }}
                onClick={() => navigate('/products-list')}
              >
                Products 
                list
              </Button>
            }
          />
          
          <CardContent sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 },
            '& .MuiGrid-item': {
              paddingTop: '16px'
            }
          }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  // fullWidth
                  label="Product Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size={isMobile ? 'small' : 'medium'}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: {
                      width: "300px",
                      borderRadius: 1,
                      backgroundColor: theme.palette.background.paper,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  // fullWidth
                  label="Description"
                  name="productdescription"
                  value={formData.productdescription}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  // rows={4}
                  size={isMobile ? 'small' : 'medium'}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: {
                      width: "300px",
                      // height: "100px",
                      borderRadius: 1,
                      backgroundColor: theme.palette.background.paper,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl 
                  fullWidth 
                  required
                  size={isMobile ? 'small' : 'medium'}
                >
                  <InputLabel>Category *</InputLabel>
                  <Select
                    name="categoryid"
                    value={formData.categoryid}
                    onChange={handleChange}
                    label="Category *"
                    sx={{
                      width: "300px",
                      borderRadius: 1,
                      '& .MuiSelect-select': {
                        backgroundColor: theme.palette.background.paper,
                      },
                    }}
                  >
                    <MenuItem value=""><em>Select a category</em></MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  // fullWidth
                  label="Price *"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size={isMobile ? 'small' : 'medium'}
                  inputProps={{ 
                    min: 0, 
                    step: '0.01',
                  }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography color="text.secondary">$</Typography>
                      </InputAdornment>
                    ),
                    sx: {
                      width: "300px",
                      borderRadius: 1,
                      backgroundColor: theme.palette.background.paper,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  // fullWidth
                  label="Stock Quantity"
                  name="productstock"
                  type="number"
                  value={formData.productstock}
                  onChange={handleChange}
                  variant="outlined"
                  size={isMobile ? 'small' : 'medium'}
                  inputProps={{ min: 0 }}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: {
                      width: "300px",
                      borderRadius: 1,
                      backgroundColor: theme.palette.background.paper,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  // fullWidth
                  label="Image URL"
                  name="productimage"
                  value={formData.productimage}
                  onChange={(e) => {
                    handleChange(e);
                    setImagePreview(e.target.value);
                  }}
                  variant="outlined"
                  size={isMobile ? 'small' : 'medium'}
                  placeholder="https://example.com/image.jpg"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    sx: {
                      width: "300px",
                      borderRadius: 1,
                      backgroundColor: theme.palette.background.paper,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={5} sx={{width: '100%'}}>
        <Card 
          variant="outlined"
          sx={{ 
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <CardHeader 
            title="Product Image" 
            titleTypographyProps={{
              variant: 'h6',
              fontWeight: 600,
            }}
            sx={{ 
              borderBottom: `1px solid ${theme.palette.divider}`,
              py: 2,
              px: { xs: 2, sm: 3 },
              backgroundColor: theme.palette.background.default,
            }}
          />
          <CardContent sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 },
            display: 'flex',
            flexDirection: 'column',
          }}>
            <Box 
              component="label"
              sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 3,
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                backgroundColor: theme.palette.background.default,
                textAlign: 'center',
                minHeight: '300px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: theme.transitions.create(['border-color', 'background-color']),
                '&:hover': {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.action.hover,
                }
              }}
            >
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
              
              {imagePreview ? (
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={imagePreview}
                    alt="Preview"
                    sx={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      borderRadius: 1,
                    }}
                  />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setImagePreview('');
                      setFormData(prev => ({ ...prev, productimage: '' }));
                    }}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: theme.palette.error.main,
                      color: theme.palette.error.contrastText,
                      '&:hover': {
                        backgroundColor: theme.palette.error.dark,
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Box sx={{ p: 2, maxWidth: '320px', mx: 'auto' }}>
                  <CloudUploadIcon 
                    sx={{ 
                      fontSize: 48, 
                      color: 'text.secondary',
                      mb: 2,
                      opacity: 0.7,
                    }} 
                  />
                  <Typography variant="subtitle1" gutterBottom>
                    Upload Product Image
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    paragraph
                    sx={{ mb: 2 }}
                  >
                    Drag & drop an image here, or click to browse
                  </Typography>
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      textTransform: 'none',
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                    }}
                  >
                    Select Image
                  </Button>
                  <Typography 
                    variant="caption" 
                    color="textSecondary" 
                    display="block" 
                    sx={{ 
                      mt: 2,
                      color: theme.palette.text.secondary,
                      opacity: 0.8
                    }}
                  >
                    Recommended: 800×800px, Max size: 2MB
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'flex-end',
            gap: 2,
            pt: 3,
            mt: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            flexWrap: 'wrap',
            '& > *': {
              width: { xs: '100%', sm: 'auto' },
            }
          }}
        >
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate(-1)}
            disabled={loading}
            sx={{
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              borderRadius: 2,
              order: { xs: 2, sm: 1 },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
            sx={{
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              boxShadow: 'none',
              order: { xs: 1, sm: 2 },
              '&:hover': {
                boxShadow: theme.shadows[4],
              },
              '& .MuiButton-startIcon': {
                marginRight: 1,
              }
            }}
          >
            {loading ? 'Saving...' : updateProduct ? 'Update Product' : 'Save Product'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  </form>
</Paper>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ 
            width: '100%',
            '& .MuiAlert-message': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddProducts;