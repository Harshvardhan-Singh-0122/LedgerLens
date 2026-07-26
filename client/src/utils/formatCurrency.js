export const formatCurrency = (amount = 0) => {
  return `₹${amount.toLocaleString("en-IN")}`;
};