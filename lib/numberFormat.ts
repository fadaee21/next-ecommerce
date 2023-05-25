const numberFormat = (number: number) => {
  return new Intl.NumberFormat("fa-IR").format(number);
};

export { numberFormat };
