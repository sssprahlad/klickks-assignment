import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { URL, REGISTER } from '../../constants/Constants';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Link as MuiLink,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Grid
} from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined, PersonOutline, EmailOutlined, CategoryOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 500,
  margin: '0 auto',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    boxShadow: 'none',
  },
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: theme.shadows[2],
  },
  transition: 'all 0.2s',
}));

const StyledAvatar = styled(Box)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.main,
  width: 60,
  height: 60,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.contrastText,
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: '2rem',
  },
}));

const categories = [
  { value: 'USER', label: 'Regular User' },
  { value: 'ADMIN', label: 'Administrator' },
  { value: 'SELLER', label: 'Seller' },
];

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    category: '',
    showPassword: false,
    showConfirmPassword: false,
    termsAccepted: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });  
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleClickShowPassword = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch(URL + REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          category: formData.category,
        }),
      });

      const data = await response.json();
      
      if (data?.status) {
        setSnackbar({
          open: true,
          message: 'Registration successful! Redirecting to login...',
          severity: 'success',
        });
        
        // Redirect to login after a short delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: data?.error || 'Registration failed. Please try again.',
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSnackbar({
        open: true,
        message: 'Unable to connect to the server. Please try again later.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Container component="main" maxWidth="sm">
      <StyledPaper elevation={3}>
        <StyledAvatar>
          <PersonOutline fontSize="large" />
        </StyledAvatar>
        <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Create an Account
        </Typography>
        
        <StyledForm onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} width="100%">
              <TextField
              sx={{
                width: "100%",
                minWidth: "150px",
                borderRadius: 1,
                backgroundColor: theme.palette.background.paper,
              }}
                margin="normal"
                required
                // fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                error={!!errors.username}
                helperText={errors.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} width="100%">
              <TextField
              sx={{
                width: "100%",
                minWidth: "150px",
                borderRadius: 1,
                backgroundColor: theme.palette.background.paper,
              }}
                margin="normal"
                required
                // fullWidth
                name="password"
                label="Password"
                type={formData.showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || 'At least 6 characters'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => handleClickShowPassword('showPassword')}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} width="100%">
              <TextField
              sx={{
                width: "100%",
                minWidth: "150px",
                borderRadius: 1,
                backgroundColor: theme.palette.background.paper,
              }}
                margin="normal"
                required
                // fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={formData.showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() => handleClickShowPassword('showConfirmPassword')}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {formData.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} width="100%">
              <FormControl 
              sx={{
                width: "100%",
                minWidth: "150px",
                borderRadius: 1,
                backgroundColor: theme.palette.background.paper,
              }}
                // fullWidth 
                margin="normal" 
                required 
                error={!!errors.category}
              >
                <InputLabel id="category-label">Account Type</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Account Type"
                  startAdornment={
                    <InputAdornment position="start">
                      <CategoryOutlined color="action" />
                    </InputAdornment>
                  }
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <FormHelperText>{errors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <FormControl 
                required 
                error={!!errors.termsAccepted}
                component="fieldset"
                sx={{ width: '100%' }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      name="termsAccepted"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the <MuiLink href="#" underline="hover">Terms of Service</MuiLink> and{' '}
                      <MuiLink href="#" underline="hover">Privacy Policy</MuiLink>
                    </Typography>
                  }
                />
                {errors.termsAccepted && (
                  <FormHelperText>{errors.termsAccepted}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
          
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </SubmitButton>
          
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <MuiLink component={Link} to="/login" variant="body2">
                Sign In
              </MuiLink>
            </Typography>
          </Box>
        </StyledForm>
      </StyledPaper>
      
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Register;