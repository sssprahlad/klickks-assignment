import React from 'react';
import { Box, Container, Grid, Typography, Link, Divider, Button } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, Email, Phone, LocationOn } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#1a237e',
  color: '#ffffff',
  padding: theme.spacing(6, 0),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%)',
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#e0e0e0',
  display: 'block',
  marginBottom: theme.spacing(1),
  textDecoration: 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.light,
    transform: 'translateX(4px)',
    textDecoration: 'none',
  },
}));

const SocialIcon = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#ffffff',
  marginRight: theme.spacing(1.5),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
}));

const Footer = ({ isMobile }) => {
  const currentYear = new Date().getFullYear();

  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={isMobile ? 4 : 6}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 2, 
                color: '#ffffff',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '50px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #4f46e5, #9333ea)',
                  borderRadius: '3px',
                },
              }}
            >
              E-Shop
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: '#e0e0e0', lineHeight: 1.7 }}>
              Your premier destination for quality products and exceptional shopping experiences. We're committed to bringing you the best deals with fast delivery and top-notch customer service.
            </Typography>
            <Box sx={{ display: 'flex', mt: 3 }}>
              <SocialIcon href="#" aria-label="Facebook">
                <Facebook />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Twitter">
                <Twitter />
              </SocialIcon>
              <SocialIcon href="#" aria-label="Instagram">
                <Instagram />
              </SocialIcon>
              <SocialIcon href="#" aria-label="LinkedIn">
                <LinkedIn />
              </SocialIcon>
            </Box>
          </Grid>

          <Grid item xs={6} sm={6} md={2}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                mb: 3, 
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '30px',
                  height: '2px',
                  backgroundColor: '#4f46e5',
                },
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FooterLink href="/">
                Home
              </FooterLink>
              <FooterLink href="/products">
                Products
              </FooterLink>
              <FooterLink href="/categories">
                Categories
              </FooterLink>
              <FooterLink href="/new-arrivals">
                New Arrivals
              </FooterLink>
              <FooterLink href="/deals">
                Deals & Offers
              </FooterLink>
            </Box>
          </Grid>

          <Grid item xs={6} sm={6} md={3}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                mb: 3,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '30px',
                  height: '2px',
                  backgroundColor: '#4f46e5',
                },
              }}
            >
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FooterLink href="/contact">
                Contact Us
              </FooterLink>
              <FooterLink href="/faq">
                FAQ
              </FooterLink>
              <FooterLink href="/shipping">
                Shipping Info
              </FooterLink>
              <FooterLink href="/returns">
                Returns & Exchanges
              </FooterLink>
              <FooterLink href="/track-order">
                Track Order
              </FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#ffffff', 
                fontWeight: 600, 
                mb: 3,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: '30px',
                  height: '2px',
                  backgroundColor: '#4f46e5',
                },
              }}
            >
              Contact Info
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Email sx={{ color: '#4f46e5', mr: 1.5, mt: 0.5,color: '#e0e0e0' }} />
                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                  support@eshop.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Phone sx={{ color: '#4f46e5', mr: 1.5,color: '#e0e0e0' }} />
                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationOn sx={{ color: '#4f46e5', mr: 1.5, mt: 0.5,color: '#e0e0e0' }} />
                <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
                  123 E-Commerce Street<br />
                  San Francisco, CA 94103
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" sx={{ color: '#e0e0e0', mb: 1.5 }}>
                Subscribe to our newsletter
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{
                    flex: 1,
                    padding: '10px 15px',
                    border: 'none',
                    borderRadius: '4px 0 0 4px',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#4f46e5',
                    color: '#ffffff',
                    borderRadius: '0 4px 4px 0',
                    textTransform: 'none',
                    boxShadow: 'none',
                    '&:hover': {
                      backgroundColor: '#4338ca',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                    height: '100%',
                    px: 2,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pt: 2,
        }}>
          <Typography variant="body2" sx={{ color: '#a0aec0', textAlign: isMobile ? 'center' : 'left', mb: isMobile ? 2 : 0 }}>
            © {currentYear} E-Shop. All rights reserved.
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 3,
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-end',
            mt: isMobile ? 2 : 0,
          }}>
            <FooterLink href="/privacy" sx={{ fontSize: '0.875rem' }}>
              Privacy Policy
            </FooterLink>
            <FooterLink href="/terms" sx={{ fontSize: '0.875rem' }}>
              Terms of Service
            </FooterLink>
            <FooterLink href="/sitemap" sx={{ fontSize: '0.875rem' }}>
              Sitemap
            </FooterLink>
            <FooterLink href="/cookies" sx={{ fontSize: '0.875rem' }}>
              Cookies
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
