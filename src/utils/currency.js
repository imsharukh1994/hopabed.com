// Currency Conversion Utility

export const RATES = {
  '$': 1.0,      // USD
  '฿': 35.5,    // THB
  '€': 0.92,     // EUR
  '£': 0.79,     // GBP
  '₹': 83.2,     // INR
  '¥': 155.0     // JPY
};

export const SYMBOLS = {
  '$': 'USD ($)',
  '฿': 'THB (฿)',
  '€': 'EUR (€)',
  '£': 'GBP (£)',
  '₹': 'INR (₹)',
  '¥': 'JPY (¥)'
};

export function formatPrice(amountInUSD, currencySymbol = '$') {
  if (amountInUSD === 0) return 'FREE';
  const rate = RATES[currencySymbol] || 1.0;
  const converted = amountInUSD * rate;

  if (currencySymbol === '฿' || currencySymbol === '₹' || currencySymbol === '¥') {
    return `${currencySymbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${currencySymbol}${converted.toFixed(2)}`;
}
