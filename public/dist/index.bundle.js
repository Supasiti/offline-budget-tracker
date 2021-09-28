/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar getTransactions = function getTransactions() {\n  return fetch('/api/transaction').then(function (response) {\n    return response.json();\n  });\n};\n\nvar postTransaction = function postTransaction(data) {\n  return fetch('/api/transaction', {\n    method: 'POST',\n    body: JSON.stringify(data),\n    headers: {\n      Accept: 'application/json, text/plain, */*',\n      'Content-Type': 'application/json'\n    }\n  });\n};\n\nvar api = {\n  getTransactions: getTransactions\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (api);\n\n//# sourceURL=webpack://budget-app/./src/api.js?");

/***/ }),

/***/ "./src/calculation.js":
/*!****************************!*\
  !*** ./src/calculation.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calculateTotal\": () => (/* binding */ calculateTotal)\n/* harmony export */ });\nvar calculateTotal = function calculateTotal(transactions) {\n  var result = transactions.reduce(function (total, t) {\n    return total + parseInt(t.value);\n  }, 0);\n  return result;\n};\n\n\n\n//# sourceURL=webpack://budget-app/./src/calculation.js?");

/***/ }),

/***/ "./src/chart.js":
/*!**********************!*\
  !*** ./src/chart.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createChartData\": () => (/* binding */ createChartData)\n/* harmony export */ });\nvar createIncrementalSum = function createIncrementalSum(arr) {\n  var sum = 0;\n  var result = arr.map(function (t) {\n    sum += parseInt(t.value);\n    return sum;\n  });\n  return result;\n};\n\nvar createLabelDates = function createLabelDates(arr) {\n  var result = arr.map(function (t) {\n    var date = new Date(t.date);\n    return \"\".concat(date.getMonth() + 1, \"/\").concat(date.getDate(), \"/\").concat(date.getFullYear());\n  });\n  return result;\n};\n\nvar createChartData = function createChartData(transactions) {\n  var reversed = transactions.slice().reverse();\n  var labels = createLabelDates(reversed);\n  var data = createIncrementalSum(reversed);\n  return {\n    data: data,\n    labels: labels\n  };\n};\n\n\n\n//# sourceURL=webpack://budget-app/./src/chart.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"populateTotal\": () => (/* binding */ populateTotal),\n/* harmony export */   \"populateTable\": () => (/* binding */ populateTable),\n/* harmony export */   \"populateChart\": () => (/* binding */ populateChart)\n/* harmony export */ });\n// populate the total\nvar populateTotal = function populateTotal(total) {\n  var totalEl = document.querySelector('#total');\n  totalEl.textContent = total;\n}; // populate the table\n\n\nvar populateTable = function populateTable(transactions) {\n  var tbody = document.querySelector('#tbody');\n  tbody.innerHTML = '';\n  transactions.forEach(function (transaction) {\n    var tr = document.createElement('tr');\n    tr.innerHTML = \"\\n      <td>\".concat(transaction.name, \"</td>\\n      <td>\").concat(transaction.value, \"</td>\\n    \");\n    tbody.appendChild(tr);\n  });\n}; // populate chart with data\n\n\nvar populateChart = function populateChart(oldChart, chartData) {\n  var data = chartData.data,\n      labels = chartData.labels;\n\n  if (oldChart) {\n    oldChart.destroy();\n  }\n\n  var ctx = document.getElementById('myChart').getContext('2d');\n  var result = new Chart(ctx, {\n    type: 'line',\n    data: {\n      labels: labels,\n      datasets: [{\n        label: 'Total Over Time',\n        fill: true,\n        backgroundColor: '#6666ff',\n        data: data\n      }]\n    }\n  });\n  return result;\n};\n\n\n\n//# sourceURL=webpack://budget-app/./src/dom.js?");

/***/ }),

/***/ "./src/form.js":
/*!*********************!*\
  !*** ./src/form.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar nameEl = document.querySelector('#t-name');\nvar amountEl = document.querySelector('#t-amount');\nvar errorEl = document.querySelector('.form .error');\n\nvar setError = function setError(text) {\n  errorEl.textContent = text;\n};\n\nvar validateForm = function validateForm() {\n  if (nameEl.value === '' || amountEl.value === '') {\n    setError('Missing Information');\n    return false;\n  } else {\n    setError('');\n    return true;\n  }\n};\n\nvar clearForm = function clearForm() {\n  nameEl.value = '';\n  amountEl.value = '';\n}; // get inputs from the form\n\n\nvar getInputs = function getInputs(isAdding) {\n  if (!validateForm()) return;\n  var result = {\n    name: nameEl.value,\n    value: isAdding ? amountEl.value : amountEl.value * -1,\n    date: new Date().toISOString()\n  };\n  return result;\n};\n\nvar useForm = function useForm() {\n  return {\n    getInputs: getInputs,\n    setError: setError,\n    clearForm: clearForm\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useForm);\n\n//# sourceURL=webpack://budget-app/./src/form.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./src/api.js\");\n/* harmony import */ var _calculation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./calculation */ \"./src/calculation.js\");\n/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chart */ \"./src/chart.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./form */ \"./src/form.js\");\n/* harmony import */ var _transactions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transactions */ \"./src/transactions.js\");\n\n\n\n\n\n\n\nvar _useTransactions = (0,_transactions__WEBPACK_IMPORTED_MODULE_5__[\"default\"])([]),\n    transactions = _useTransactions.transactions,\n    setTransactions = _useTransactions.setTransactions,\n    addTransaction = _useTransactions.addTransaction;\n\nvar _useForm = (0,_form__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(),\n    getInputs = _useForm.getInputs,\n    setError = _useForm.setError,\n    clearForm = _useForm.clearForm;\n\nvar myChart; // populate all dom elements\n\nvar populateAll = function populateAll() {\n  var total = (0,_calculation__WEBPACK_IMPORTED_MODULE_1__.calculateTotal)(transactions());\n  var chartData = (0,_chart__WEBPACK_IMPORTED_MODULE_2__.createChartData)(transactions());\n  (0,_dom__WEBPACK_IMPORTED_MODULE_3__.populateTotal)(total);\n  (0,_dom__WEBPACK_IMPORTED_MODULE_3__.populateTable)(transactions());\n  myChart = (0,_dom__WEBPACK_IMPORTED_MODULE_3__.populateChart)(myChart, chartData);\n}; // send over the data\n\n\nvar sendTransaction = function sendTransaction(isAdding) {\n  var transaction = getInputs(isAdding);\n  if (!transaction) return;\n  addTransaction(transaction);\n  populateAll();\n  _api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].sendTransaction(transaction).then(function (response) {\n    return response.json();\n  }).then(function (data) {\n    if (data.errors) {\n      setError('Missing Information');\n    } else {\n      clearForm();\n    }\n  })[\"catch\"](function (err) {\n    // fetch failed, so save in indexed db\n    saveRecord(transaction);\n    clearForm();\n  });\n};\n\ndocument.querySelector('#add-btn').onclick = function () {\n  sendTransaction(true);\n};\n\ndocument.querySelector('#sub-btn').onclick = function () {\n  sendTransaction(false);\n};\n\n_api__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTransactions().then(function (data) {\n  setTransactions(data);\n  populateAll();\n});\n\n//# sourceURL=webpack://budget-app/./src/index.js?");

/***/ }),

/***/ "./src/transactions.js":
/*!*****************************!*\
  !*** ./src/transactions.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar _transactions = [];\n\nvar setTransactions = function setTransactions(values) {\n  if (values instanceof Array) {\n    _transactions = _toConsumableArray(values);\n  }\n};\n\nvar addTransaction = function addTransaction(transaction) {\n  _transactions = [transaction].concat(_toConsumableArray(_transactions));\n};\n\nvar useTransactions = function useTransactions(defaultValue) {\n  setTransactions(defaultValue);\n  return {\n    transactions: function transactions() {\n      return _transactions;\n    },\n    setTransactions: setTransactions,\n    addTransaction: addTransaction\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useTransactions);\n\n//# sourceURL=webpack://budget-app/./src/transactions.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;