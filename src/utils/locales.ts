const toCurrency = (number: number) => {
  return number.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
};

export const locales = {
  toCurrency
};
