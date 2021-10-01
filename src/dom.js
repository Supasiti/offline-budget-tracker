// populate the total
const populateTotal = (total) => {
  let totalEl = document.querySelector('#total');
  totalEl.textContent = total;
};

// populate the table
const populateTable = (transactions) => {
  let tbody = document.querySelector('#tbody');
  tbody.innerHTML = '';

  transactions.forEach((transaction) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${transaction.name}</td>
      <td>${transaction.value}</td>
    `;

    tbody.appendChild(tr);
  });
};

// populate chart with data
const populateChart = (oldChart, chartData) => {
  const { data, labels } = chartData;

  if (oldChart) {
    oldChart.destroy();
  }

  let ctx = document.getElementById('myChart').getContext('2d');

  const result = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Total Over Time',
          fill: true,
          backgroundColor: '#6666ff',
          data,
        },
      ],
    },
  });
  return result;
};

export { populateTotal, populateTable, populateChart };
