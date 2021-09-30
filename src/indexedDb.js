import api from './api';

const openDb = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('transactions', 1);
    request.onsuccess = () => resolve(request);
    request.onerror = () => reject(request);
  });
};

const setup = (request) => {
  const db = request.result;
  const tx = db.transaction(['transactions'], 'readwrite');
  const transactionStore = tx.objectStore('transactions');

  return { db, tx, transactionStore };
};

// Creates an object store with a autoincrement keypath
// if not exist
const createTransactionTable = (event) => {
  const db = event.target.result;
  if (!db.objectStoreNames.contains('transactions')) {
    db.createObjectStore('transactions', {
      keyPath: 'id',
      autoIncrement: true,
    });
  }
};

// handle add transaction to indexeddb
const handleAddTransaction = (request, transaction) => {
  const { transactionStore, tx } = setup(request);
  transactionStore.add(transaction);
  window.addEventListener('online', (e) => postTransactions());
  return tx.complete;
};

//--------------------------------------------------------------------

// clear transactions
const handleClearTransactions = (request) => {
  const { transactionStore, tx } = setup(request);
  const clearReq = transactionStore.clear();
  clearReq.onsuccess = () => tx.complete;
};

// post to transactions api
const postApiTransactions = async (transactions) => {
  try {
    const res = await api.postTransactions(transactions);
    const data = await res.json();
    if (!data.errors) {
      console.log(
        'Successfully saved offline transactions to the database!',
      );
      clearTransactions();
    } else {
      throw new Error(data.errors.message);
    }
  } catch (err) {
    console.error(err.message);
  }
};

// handle posting transactions
const handlePostTransactions = (request) => {
  const { transactionStore } = setup(request);
  const txReq = transactionStore.getAll();
  txReq.onsuccess = () => postApiTransactions(txReq.result);
};

//--------------------------------------
// create DB and transactions table
const initTransactionDb = () => {
  if (!('indexedDB' in window)) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }
  const request = window.indexedDB.open('transactions', 1);
  request.onupgradeneeded = createTransactionTable;
};

// save transaction
const saveTransaction = async (transaction) => {
  // const request = window.indexedDB.open('transactions', 1);
  // request.onsuccess = () =>
  //   handleAddTransaction(request, transaction);

  const request = await openDb();
  handleAddTransaction(request, transaction);
};

// post transactions
const postTransactions = () => {
  const request = window.indexedDB.open('transactions', 1);
  request.onsuccess = () => handlePostTransactions(request);
};

// clear all transactions
const clearTransactions = () => {
  const request = window.indexedDB.open('transactions', 1);
  request.onsuccess = () => handleClearTransactions(request);
};

export { initTransactionDb, saveTransaction, postTransactions };
