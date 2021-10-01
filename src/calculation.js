const calculateTotal = (transactions) => {
  const result = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);
  return result;
};

export { calculateTotal };
