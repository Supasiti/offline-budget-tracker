const getTransactions = () =>
  fetch('/api/transaction').then((response) => {
    return response.json();
  });

const postTransaction = (data) =>
  fetch('/api/transaction', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  });

const api = {
  getTransactions,
  postTransaction,
};

export default api;
