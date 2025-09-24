import React from 'react';
import { Box, CssBaseline, Container, useMediaQuery, useTheme } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <CssBaseline />
      <Navbar isMobile={isMobile} />
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: isMobile ? 2 : 4,
          px: isMobile ? 1 : 2,
          width: '100%',
        }}
      >
        {children}
      </Container>
      <Footer isMobile={isMobile} />
    </Box>
  );
};

export default Layout;
