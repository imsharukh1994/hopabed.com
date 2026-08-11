// Multi-Currency & Crypto Exchange Rates Utility
// Base currency: USD

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0, flag: '🇺🇸' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, flag: '🇪🇺' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, flag: '🇬🇧' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 154.5, flag: '🇯🇵' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.4, flag: '🇮🇳' },
  THB: { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 36.5, flag: '🇹🇭' },
  USDC: { code: 'USDC', symbol: '₮', name: 'USDC (Crypto)', rate: 1.0, flag: '🌐' }
};

/**
 * Formats a USD base price into the target currency representation
 * @param {number} amountInUSD - The base price in USD
 * @param {string} targetCurrencyCode - Currency code (e.g. 'EUR', 'JPY', 'USDC')
 * @returns {string} Formatted price with symbol (e.g. "€4.60", "¥772.50", "0.00 FREE")
 */
export function formatPrice(amountInUSD, targetCurrencyCode = 'USD') {
  if (amountInUSD === 0 || amountInUSD === '0' || amountInUSD === 'FREE') {
    return 'FREE';
  }

  const numVal = parseFloat(amountInUSD) || 0;
  const currencyObj = CURRENCIES[targetCurrencyCode] || CURRENCIES.USD;
  const convertedVal = numVal * currencyObj.rate;

  if (targetCurrencyCode === 'JPY' || targetCurrencyCode === 'INR') {
    return `${currencyObj.symbol}${Math.round(convertedVal).toLocaleString()}`;
  }

  if (targetCurrencyCode === 'USDC') {
    return `${convertedVal.toFixed(2)} ${currencyObj.symbol} USDC`;
  }

  return `${currencyObj.symbol}${convertedVal.toFixed(2)}`;
}

/**
 * Gets currency symbol for given code
 */
export function getCurrencySymbol(code = 'USD') {
  return CURRENCIES[code]?.symbol || '$';
}
