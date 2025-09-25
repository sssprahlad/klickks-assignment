import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import AddBox from '@mui/icons-material/AddBox';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge, 
  Box, 
  Menu, 
  MenuItem, 
  useTheme, 
  useMediaQuery,
  Container,
  Avatar,
  Divider,
  ListItemIcon,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  ExitToApp,
  Category,
  Home,
  Info,
  ContactMail,
  ExpandLess,
  ExpandMore,
  PersonAdd
} from '@mui/icons-material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCount } from '../redux/reducer/user';
import { URL, GET_CART } from '../constants/Constants';

const Navbar = ({ isMobile }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const username = Cookies.get('username');
  const category = Cookies.get('category');
  const count = useSelector((state) => state.user.count);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState(0);

  console.log(count,"count in navbar");

 
  useEffect(() => {
    const fetchCart = async () => {
      const token = Cookies.get('jwt_token');
      if (!token) {
        dispatch(setCount(0));
        setCartItems(0);
        return;
      }

      try {
        const response = await axios.get(`${URL}${GET_CART}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        // Handle different response formats
        const items = response.data?.products || response.data || [];
        console.log(items,"items");
        const itemCount = items?.items?.length || 0;
        console.log(itemCount,"itemCount");
        
        // Update both local state and Redux store
        dispatch(setCount(itemCount));
        setCartItems(itemCount);
      } catch (error) {
        console.error('Error fetching cart:', error);
        dispatch(setCount(0));
        setCartItems(0);
      }
    };

    fetchCart();
    
    // Optional: Set up an interval to refresh cart count periodically
    const interval = setInterval(fetchCart, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [count]); 
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const isLoggedIn = !!Cookies.get('jwt_token');

  console.log(count,"count");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      Cookies.remove('jwt_token');
      Cookies.remove('username');
      dispatch(setCount(0));
      handleClose();
      navigate('/login', { replace: true });
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryToggle = () => {
    setCategoryOpen(!categoryOpen);
  };

  console.log(cartItems,"cartItems");

  const menuItems = [
    { text: 'Home', path: '/home', icon: <Home /> },
    { text: 'Categories', path: '/categories-list', icon: <Category /> },
    { text: 'About', path: '/about', icon: <Info /> },
    { text: 'Contact', path: '/contact', icon: <ContactMail /> },
    ...(category === "ADMIN" ? [
      { text: 'Add Category', path: '/add-category', icon: <Category /> },
      { text: 'Add Product', path: '/add-product', icon: <AddBox /> }
    ] : [])
  ].filter(Boolean);

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              component={NavLink} 
              to={item.path}
              sx={{
                
                '&.active': {
                  backgroundColor: theme.palette.action.selected,
                  '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                    color: theme.palette.primary.main,
                    fontWeight: 'medium',
                  },
                },
                
                
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {isLoggedIn ? (
        <List>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon><ExitToApp /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      ) : (
        <List>
          <ListItemButton component={NavLink} to="/login">
            <ListItemIcon><Person /></ListItemIcon>
            <ListItemText primary="Login" />
          </ListItemButton>
          <ListItemButton component={NavLink} to="/register">
            <ListItemIcon><PersonAdd /></ListItemIcon>
            <ListItemText primary="Register" />
          </ListItemButton>
        </List>
      )}
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 'bold',
              '&:hover': {
                color: theme.palette.primary.main,
              },
            }}
          >
            E-Commerce
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={NavLink}
                  to={item.path}
                  sx={{
                    mx: 1,
                    color: 'inherit',
                    '&.active': {
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Box sx={{ position: 'relative' }}>
              <IconButton
                component={NavLink}
                to="/cart"
                size="large"
                aria-label={`show ${cartItems} items in cart`}
                color="inherit"
                sx={{
                  '&.active': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Badge 
                  
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: 'white',
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                    },
                    position: 'relative',
                  }}
                >
                  <ShoppingCart sx={{ fontSize: 28 }} />
                </Badge>
                {cartItems > 0 && (
                  <Typography 
                    variant="caption" 
                    sx={{
                      position: 'absolute',
                      bottom: 4,
                      right: 4,
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      borderRadius: '50%',
                      width: '18px',
                      height: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 'bold',
                    }}
                  >
                    {cartItems}
                  </Typography>
                )}
              </IconButton>
            </Box>

            {isLoggedIn ? (
              <>
                <IconButton
                  onClick={handleMenu}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                    {username?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem disabled>
                    <Typography>Welcome, {username}</Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <ExitToApp fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : !isMobile ? (
              <>
                <Button
                  component={NavLink}
                  to="/login"
                  color="inherit"
                  sx={{
                    ml: 1,
                    '&.active': {
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={NavLink}
                  to="/register"
                  variant="contained"
                  color="primary"
                  sx={{
                    ml: 1,
                    '&.active': {
                      bgcolor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Register
                </Button>
              </>
            ) : null}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Navbar;
