import api from './api';

const openDb = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('transactions', 1);
    request.onsuccess = () => resolve(request);
    request.onerror = () => reject(request);
  });
};

const setup = async () => {
  const request = await openDb();
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
  const { transactionStore, tx } = await setup();
  transactionStore.add(transaction);
  window.addEventListener('online', () => postTransactions());
  return tx.complete;
};

// post transactions
const postTransactions = async () => {
  const { transactionStore } = await setup();
  const txReq = transactionStore.getAll();
  txReq.onsuccess = () => postApiTransactions(txReq.result);
};

// clear all transactions
const clearTransactions = async () => {
  const { transactionStore, tx } = await setup();
  const clearReq = transactionStore.clear();
  clearReq.onsuccess = () => tx.complete;
};

export { initTransactionDb, saveTransaction, postTransactions };
