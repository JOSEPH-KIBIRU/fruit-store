// eslint-disable-next-line no-unused-vars
import { Container, Typography, Button, Box, Grid, Paper, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SecurityIcon from '@mui/icons-material/Security';

export default function Home() {
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuth();

  const features = [
    {
      icon: <LocalGroceryStoreIcon sx={{ fontSize: 40, justifyItems:'center', color: 'primary.main' }} />,
      title: 'Fresh & Organic',
      description: 'Direct from Kenyan farms to your doorstep'
    },
    {
      icon: <LocalShippingIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Free Delivery',
      description: 'Nairobi free delivery for orders above KSh 2,000'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Quality Guaranteed',
      description: '100% satisfaction or your money back'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure Payment',
      description: 'MPESA and secure card payments'
    }
  ];

  const popularFruits = [
    { name: 'Sweet Mangoes', price: 150, image: '🥭', unit: 'kg' },
    { name: 'Creamy Avocados', price: 80, image: '🥑', unit: 'piece' },
    { name: 'Fresh Pineapples', price: 120, image: '🍍', unit: 'piece' },
    { name: 'Ripe Bananas', price: 50, image: '🍌', unit: 'bunch' }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 8,
        background: 'linear-gradient(135deg, #740553ff 0%, #45a049 100%)'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                Fresh Fruits from Kenyan Farms
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ mb: 4, opacity: 0.9 }}>
                Taste the freshness of locally sourced fruits delivered to your doorstep
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  component={Link} 
                  to="/shop"
                  sx={{ 
                    bgcolor: 'white', 
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' }
                  }}
                >
                  🛍️ Shop Now
                </Button>
                <Button 
                  variant="outlined" 
                  size="large" 
                  component={Link} 
                  to="/shop"
                  sx={{ 
                    borderColor: 'white', 
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  🌟 See Offers
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                textAlign: 'center',
                fontSize: '120px',
                lineHeight: 1,
                animation: 'float 3s ease-in-out infinite'
              }}>
                🍎🍌🍊🍇
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Why Choose Us?
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          We bring the best of Kenyan agriculture to your home
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Popular Products */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container>
          <Typography variant="h3" align="center" gutterBottom>
            Popular This Season
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Fresh picks from our Kenyan farms
          </Typography>
          
          <Grid container spacing={3}>
            {popularFruits.map((fruit, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card sx={{ height: '100%', textAlign: 'center' }}>
                  <CardContent>
                    <Typography variant="h2" sx={{ mb: 2 }}>
                      {fruit.image}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {fruit.name}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      KSh {fruit.price} / {fruit.unit}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Ready to Taste Freshness?
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Join thousands of happy customers across Kenya
        </Typography>
        <Button 
          variant="contained" 
          size="large" 
          component={Link} 
          to="/shop"
          sx={{ 
            px: 6, 
            py: 1.5,
            fontSize: '1.1rem'
          }}
        >
          Start Shopping Now
        </Button>
      </Container>

      {/* Add CSS animation */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </Box>
  );
}