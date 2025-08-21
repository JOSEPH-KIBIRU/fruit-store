import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { Box, TextField, Button, Typography, Stepper, Step, StepLabel, Paper, Divider } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

const steps = ['Shipping Information', 'Payment', 'Confirmation'];

export default function CheckoutForm({ cartItems, totalAmount, onSuccess, onCancel }) {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    county: ''
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleShippingSubmit = () => {
    setActiveStep(1);
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Create order in database
      // eslint-disable-next-line no-unused-vars
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user?.id,
          total_amount: totalAmount,
          shipping_address: shippingData,
          status: 'pending',
          items: cartItems
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Update product stock (optional)
      for (const item of cartItems) {
        await supabase
          .from('fruits')
          .update({ stock_quantity: item.stock_quantity - item.quantity })
          .eq('id', item.id);
      }

      // 3. Simulate payment success
      setTimeout(() => {
        setLoading(false);
        setActiveStep(2);
      }, 2000);

    } catch (error) {
      alert('Checkout error: ' + error.message);
      setLoading(false);
    }
  };

  const handleComplete = () => {
    onSuccess();
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleShippingSubmit(); }}>
          <Typography variant="h6" gutterBottom>
            Shipping Information
          </Typography>
          
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={shippingData.fullName}
            onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})}
            required
          />
          
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={shippingData.phone}
            onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
            required
          />
          
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={shippingData.email}
            onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
            required
          />
          
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={shippingData.address}
            onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
            required
          />
          
          <TextField
            label="City"
            fullWidth
            margin="normal"
            value={shippingData.city}
            onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
            required
          />
          
          <TextField
            label="County"
            fullWidth
            margin="normal"
            value={shippingData.county}
            onChange={(e) => setShippingData({...shippingData, county: e.target.value})}
            required
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button onClick={onCancel}>Cancel</Button>
            <Button type="submit" variant="contained">
              Continue to Payment
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Payment Method
          </Typography>
          
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              Total Amount: <strong>KSh {Math.round(totalAmount * 100).toLocaleString()}</strong>
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              For demo purposes, payment is simulated. In production, integrate with MPESA or other payment gateways.
            </Typography>
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button onClick={() => setActiveStep(0)}>Back</Button>
            <Button 
              variant="contained" 
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Payment'}
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 2 && (
        <Box textAlign="center">
          <Typography variant="h6" gutterBottom color="success.main">
            Order Confirmed! 🎉
          </Typography>
          <Typography variant="body1" gutterBottom>
            Thank you for your purchase. Your order has been received.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </Typography>
          <Button variant="contained" onClick={handleComplete}>
            Continue Shopping
          </Button>
        </Box>
      )}
    </Box>
  );
}