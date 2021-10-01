let transactions = [];

const setTransactions = (values) => {
  if (values instanceof Array) {
    transactions = [...values];
  }
};

const addTransaction = (transaction) => {
  transactions = [transaction, ...transactions];
};

const useTransactions = (defaultValue) => {
  setTransactions(defaultValue);
  return {
    transactions: () => transactions,
    setTransactions,
    addTransaction,
  };
};

export default useTransactions;
