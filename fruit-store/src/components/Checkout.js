import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { initiateSTKPush } from '../services/mpesa'

export default function Checkout({ totalAmount, onSuccess }) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleMpesaPayment = async () => {
    try {
      await initiateSTKPush(phoneNumber, totalAmount * 100, 'ORDER123');
      onSuccess();
    } catch (error) {
      alert('MPESA payment failed: ' + error.message);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        MPESA Payment
      </Typography>
      <TextField
        label="Phone Number (07XX XXX XXX)"
        fullWidth
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="e.g., 0712345678"
      />
      <Button variant="contained" onClick={handleMpesaPayment} sx={{ mt: 2 }}>
        Pay KSh {Math.round(totalAmount * 100).toLocaleString()} via MPESA
      </Button>
    </Box>
  );
}