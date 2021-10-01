const createIncrementalSum = (arr) => {
  let sum = 0;
  const result = arr.map((t) => {
    sum += parseInt(t.value);
    return sum;
  });
  return result;
};

const createLabelDates = (arr) => {
  const result = arr.map((t) => {
    const date = new Date(t.date);
    return `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
  });
  return result;
};

const createChartData = (transactions) => {
  const reversed = transactions.slice().reverse();
  const labels = createLabelDates(reversed);
  const data = createIncrementalSum(reversed);
  return { data, labels };
};

export { createChartData };
