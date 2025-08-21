export const DELIVERY_RATES = {
  'Nairobi': 200,
  'Mombasa': 500,
  'Kisumu': 400,
  'Other': 600
};

export const calculateDelivery = (county, amount) => {
  const rate = DELIVERY_RATES[county] || DELIVERY_RATES['Other'];
  return amount > 2000 ? 0 : rate; // Free delivery over 2000 KSH
};