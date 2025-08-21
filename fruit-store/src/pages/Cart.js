import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useCart } from '../context/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckoutForm from '../components/CheckoutForm';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleCheckoutClose = () => {
    setCheckoutOpen(false);
  };

  const handleOrderSuccess = () => {
    clearCart();
    setCheckoutOpen(false);
    alert('Order placed successfully! Thank you for your purchase.');
  };

  // Mobile View
  if (isMobile) {
    return (
      <Container sx={{ py: 2, minHeight: '100vh', bgcolor: 'grey.50' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, pt: 2 }}>
          <IconButton onClick={() => window.history.back()} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
            🛒 Your Cart
          </Typography>
          <ShoppingCartIcon color="primary" />
          {getTotalItems() > 0 && (
            <Box
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                ml: 1
              }}
            >
              {getTotalItems()}
            </Box>
          )}
        </Box>

        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', mt: 8, p: 3 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Add some delicious fruits to get started!
            </Typography>
            <Button 
              variant="contained" 
              href="/shop"
              sx={{ 
                borderRadius: 3,
                px: 4,
                py: 1.5
              }}
            >
              Start Shopping
            </Button>
          </Box>
        ) : (
          <Box>
            {/* Cart Items */}
            {cartItems.map((item) => (
              <Paper 
                key={item.id} 
                sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderRadius: 3,
                  bgcolor: 'white'
                }}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  {/* Product Image */}
                  <img 
                    src={item.image_url || '/placeholder-fruit.jpg'} 
                    alt={item.name}
                    style={{ 
                      width: 80, 
                      height: 80, 
                      objectFit: 'cover', 
                      borderRadius: 12 
                    }}
                  />
                  
                  {/* Product Info */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                      KSh {Math.round(item.price * 100).toLocaleString()}
                    </Typography>
                    
                    {/* Quantity Controls */}
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      bgcolor: 'grey.100',
                      borderRadius: 2,
                      p: 1,
                      mb: 1
                    }}>
                      <IconButton 
                        size="small" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        sx={{ 
                          bgcolor: 'white',
                          '&:hover': { bgcolor: 'grey.200' }
                        }}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      
                      <Typography sx={{ mx: 2, fontWeight: 'bold', minWidth: 20, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      
                      <IconButton 
                        size="small" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        sx={{ 
                          bgcolor: 'white',
                          '&:hover': { bgcolor: 'grey.200' }
                        }}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    {/* Subtotal */}
                    <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                      Subtotal: KSh {Math.round((item.price * item.quantity) * 100).toLocaleString()}
                    </Typography>
                  </Box>
                  
                  {/* Delete Button */}
                  <IconButton 
                    color="error"
                    onClick={() => removeFromCart(item.id)}
                    sx={{ 
                      alignSelf: 'flex-start',
                      bgcolor: 'error.light',
                      '&:hover': { bgcolor: 'error.main' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Paper>
            ))}
            
            {/* Total and Actions */}
            <Paper sx={{ p: 3, borderRadius: 3, bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Order Summary
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Items ({getTotalItems()}):</Typography>
                <Typography>KSh {Math.round(getTotalPrice() * 100).toLocaleString()}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  KSh {Math.round(getTotalPrice() * 100).toLocaleString()}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  onClick={clearCart}
                  fullWidth
                  sx={{ 
                    bgcolor: 'white',
                    color: 'primary.main',
                    border: 'none',
                    borderRadius: 2,
                    py: 1.5,
                    '&:hover': {
                      bgcolor: 'grey.100',
                      border: 'none'
                    }
                  }}
                >
                  Clear All
                </Button>
                
                <Button 
                  variant="contained"
                  onClick={handleCheckout}
                  fullWidth
                  sx={{ 
                    bgcolor: 'white',
                    color: 'primary.main',
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: 'grey.100'
                    }
                  }}
                >
                  Checkout
                </Button>
              </Box>
            </Paper>
          </Box>
        )}

        {/* Checkout Dialog */}
        <Dialog 
          open={checkoutOpen} 
          onClose={handleCheckoutClose} 
          fullWidth
          fullScreen={isMobile}
        >
          <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
            Checkout
          </DialogTitle>
          <DialogContent sx={{ p: 0 }}>
            <CheckoutForm 
              cartItems={cartItems}
              totalAmount={getTotalPrice()}
              onSuccess={handleOrderSuccess}
              onCancel={handleCheckoutClose}
            />
          </DialogContent>
        </Dialog>
      </Container>
    );
  }

  // Desktop View
  return (
    <Container sx={{ py: 4, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Shopping Cart
      </Typography>
      
      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <ShoppingCartIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="text.secondary">
            Your cart is empty
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Looks like you haven't added any fruits yet
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            href="/shop"
            sx={{ 
              borderRadius: 3,
              px: 6,
              py: 1.5,
              fontSize: '1.1rem'
            }}
          >
            Browse Fruits
          </Button>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Table>
              <TableHead sx={{ bgcolor: 'primary.main' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product</TableCell>
                  <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                  <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Subtotal</TableCell>
                  <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <img 
                          src={item.image_url || '/placeholder-fruit.jpg'} 
                          alt={item.name}
                          style={{ 
                            width: 60, 
                            height: 60, 
                            objectFit: 'cover', 
                            borderRadius: 8 
                          }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Fresh from farm
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                        KSh {Math.round(item.price * 100).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'grey.300'
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ minWidth: 30, textAlign: 'center', fontWeight: 'bold' }}>
                          {item.quantity}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          sx={{ 
                            border: '1px solid',
                            borderColor: 'grey.300'
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        KSh {Math.round((item.price * item.quantity) * 100).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton 
                        color="error"
                        onClick={() => removeFromCart(item.id)}
                        sx={{ 
                          bgcolor: 'error.light',
                          '&:hover': { bgcolor: 'error.main' }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button 
              variant="outlined" 
              color="error"
              onClick={clearCart}
              startIcon={<DeleteIcon />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1
              }}
            >
              Clear Cart
            </Button>
            
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                Total: KSh {Math.round(getTotalPrice() * 100).toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in cart
              </Typography>
              <Button 
                variant="contained" 
                size="large"
                onClick={handleCheckout}
                sx={{ 
                  borderRadius: 3,
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Box>
        </>
      )}

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onClose={handleCheckoutClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white' }}>
          Checkout
        </DialogTitle>
        <DialogContent>
          <CheckoutForm 
            cartItems={cartItems}
            totalAmount={getTotalPrice()}
            onSuccess={handleOrderSuccess}
            onCancel={handleCheckoutClose}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
}