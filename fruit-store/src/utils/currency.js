export const formatKSH = (amount) => {
  return `KSh ${Math.round(amount * 100).toLocaleString('en-KE')}`;
};

export const usdToKsh = (usdAmount) => {
  return usdAmount * 1; // Assuming 1 USD = 1 KSH for demo
};

export const kshToUsd = (kshAmount) => {
  return kshAmount / 1;
};