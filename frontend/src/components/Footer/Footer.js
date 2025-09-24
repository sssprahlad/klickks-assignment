import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = ({ isMobile }) => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.secondary',
        py: isMobile ? 3 : 4,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 3 : 4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="primary" gutterBottom>
              E-Commerce
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Your one-stop shop for all your needs. Quality products, fast delivery, and excellent customer service.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Link href="#" color="inherit">
                <Facebook />
              </Link>
              <Link href="#" color="inherit">
                <Twitter />
              </Link>
              <Link href="#" color="inherit">
                <Instagram />
              </Link>
              <Link href="#" color="inherit">
                <LinkedIn />
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Shop
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/products" color="inherit" sx={{ mb: 1 }}>
                All Products
              </Link>
              <Link href="/categories" color="inherit" sx={{ mb: 1 }}>
                Categories
              </Link>
              <Link href="/new-arrivals" color="inherit" sx={{ mb: 1 }}>
                New Arrivals
              </Link>
              <Link href="/deals" color="inherit" sx={{ mb: 1 }}>
                Special Deals
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/contact" color="inherit" sx={{ mb: 1 }}>
                Contact Us
              </Link>
              <Link href="/faq" color="inherit" sx={{ mb: 1 }}>
                FAQ
              </Link>
              <Link href="/shipping" color="inherit" sx={{ mb: 1 }}>
                Shipping Info
              </Link>
              <Link href="/returns" color="inherit" sx={{ mb: 1 }}>
                Returns & Exchanges
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 1,
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  flexGrow: 1,
                  fontSize: '0.875rem',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  textTransform: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Subscribe
              </button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: 1,
          }}
        >
          <Typography variant="body2">
            © {currentYear} E-Commerce. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mt: isMobile ? 1 : 0 }}>
            <Link href="/privacy" color="inherit" variant="body2">
              Privacy Policy
            </Link>
            <Link href="/terms" color="inherit" variant="body2">
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
