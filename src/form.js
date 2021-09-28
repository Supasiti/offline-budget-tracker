let nameEl = document.querySelector('#t-name');
let amountEl = document.querySelector('#t-amount');
let errorEl = document.querySelector('.form .error');

const setError = (text) => {
  errorEl.textContent = text;
};

const validateForm = () => {
  if (nameEl.value === '' || amountEl.value === '') {
    setError('Missing Information');
    return false;
  } else {
    setError('');
    return true;
  }
};

const clearForm = () => {
  nameEl.value = '';
  amountEl.value = '';
};

// get inputs from the form
const getInputs = (isAdding) => {
  if (!validateForm()) return;

  const result = {
    name: nameEl.value,
    value: isAdding ? amountEl.value : amountEl.value * -1,
    date: new Date().toISOString(),
  };
  return result;
};

const useForm = () => {
  return { getInputs, setError, clearForm };
};

export default useForm;
