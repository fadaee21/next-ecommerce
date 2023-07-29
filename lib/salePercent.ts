export const salePercent = (price: number, sale_price: number) => {
  return Math.round(((price - sale_price) / price) * 100);
};
