import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Divider,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Twitter as TwitterIcon, 
  LinkedIn as LinkedInIcon, 
  WhatsApp as WhatsAppIcon, 
  Facebook as FacebookIcon, 
  Instagram as InstagramIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Send as SendIcon
} from '@mui/icons-material';

// Styled components for better organization
const ContactContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
}));

const ContactPaper = styled(Paper)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: theme.shadows[10],
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: theme.palette.common.white,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
    transform: 'rotate(30deg)',
  },
  [theme.breakpoints.up('md')]: {
    width: '40%',
    padding: theme.spacing(6),
  },
}));

const ContactForm = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.up('md')]: {
    width: '60%',
    padding: theme.spacing(6),
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(3),
  '& svg': {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(0.5),
    color: theme.palette.primary.light,
  },
}));

const Contact = ({setUpdateProduct}) => {
  useEffect(() => {
    setUpdateProduct(null);
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Show success message
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <ContactContainer maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
        Get In Touch
      </Typography>
      
      <ContactPaper elevation={3}>
        <ContactInfo>
          <Box position="relative" zIndex={1}>
            <Typography variant="h4" component="h2" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4, opacity: 0.9 }}>
              Have questions or need assistance? Fill out the form and our team will get back to you as soon as possible.
            </Typography>
            
            <Box mt={4}>
              <ContactItem>
                <LocationIcon />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Our Location</Typography>
                  <Typography variant="body2">123 E-Commerce Street, Tech City, TC 12345</Typography>
                </Box>
              </ContactItem>
              
              <ContactItem>
                <EmailIcon />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Email Us</Typography>
                  <Typography variant="body2">support@klickks.com</Typography>
                  <Typography variant="body2">info@klickks.com</Typography>
                </Box>
              </ContactItem>
              
              <ContactItem>
                <PhoneIcon />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">Call Us</Typography>
                  <Typography variant="body2">+1 (555) 123-4567</Typography>
                  <Typography variant="body2">+1 (555) 987-6543</Typography>
                </Box>
              </ContactItem>
              
              <Box mt={4}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton href="#" color="inherit" aria-label="Facebook">
                    <FacebookIcon />
                  </IconButton>
                  <IconButton href="#" color="inherit" aria-label="Twitter">
                    <TwitterIcon />
                  </IconButton>
                  <IconButton href="#" color="inherit" aria-label="Instagram">
                    <InstagramIcon />
                  </IconButton>
                  <IconButton href="#" color="inherit" aria-label="LinkedIn">
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton href="#" color="inherit" aria-label="WhatsApp">
                    <WhatsAppIcon />
                  </IconButton>
                </Stack>
              </Box>
            </Box>
          </Box>
        </ContactInfo>
        
        <ContactForm>
          <Typography variant="h5" component="h3" gutterBottom>
            Send us a Message
          </Typography>
          <Divider sx={{ mb: 4 }} />
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  multiline
                  rows={6}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  endIcon={<SendIcon />}
                  sx={{
                    py: 1.5,
                    mt: 2,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                  }}
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ContactForm>
      </ContactPaper>
    </ContactContainer>
  );
};

export default Contact;
