import api from './api';
import { calculateTotal } from './calculation';
import { createChartData } from './chart';
import { populateTotal, populateTable, populateChart } from './dom';
import useForm from './form';
import useTransactions from './transactions';

const { transactions, setTransactions, addTransaction } =
  useTransactions([]);
const { getInputs, setError, clearForm } = useForm();
let myChart;

// populate all dom elements
const populateAll = () => {
  const total = calculateTotal(transactions());
  const chartData = createChartData(transactions());
  populateTotal(total);
  populateTable(transactions());
  myChart = populateChart(myChart, chartData);
};

// send over the data
const sendTransaction = (isAdding) => {
  const transaction = getInputs(isAdding);
  if (!transaction) return;

  addTransaction(transaction);
  populateAll();

  api
    .sendTransaction(transaction)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.errors) {
        setError('Missing Information');
      } else {
        clearForm();
      }
    })
    .catch((err) => {
      // fetch failed, so save in indexed db
      saveRecord(transaction);
      clearForm();
    });
};

document.querySelector('#add-btn').onclick = function () {
  sendTransaction(true);
};

document.querySelector('#sub-btn').onclick = function () {
  sendTransaction(false);
};

api.getTransactions().then((data) => {
  setTransactions(data);
  populateAll();
});
