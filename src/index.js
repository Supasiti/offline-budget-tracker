import api from './api';
import { calculateTotal } from './calculation';
import { createChartData } from './chart';
import { populateTotal, populateTable, populateChart } from './dom';
import useForm from './form';
import useTransactions from './transactions';
import { addServiceWorker } from './serviceWorker';

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
const sendTransaction = async (isAdding) => {
  const transaction = getInputs(isAdding);
  if (!transaction) return;

  addTransaction(transaction);
  populateAll();

  try {
    const res = await api.postTransaction(transaction);
    const data = await res.json();
    if (data.errors) {
      setError('Missing Information');
    } else {
      clearForm();
    }
  } catch (err) {
    // fetch failed, so save in indexed db
    saveRecord(transaction);
    clearForm();
  }
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

addServiceWorker();
