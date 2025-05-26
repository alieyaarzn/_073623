async function fetchCryptoData() {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd');
  const data = await response.json();

  const tbody = document.querySelector('#cryptoTable tbody');
  tbody.innerHTML = '';

  data.slice(0, 10).forEach((coin, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${coin.market_cap_rank}</td>
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td>$${coin.market_cap.toLocaleString()}</td>
      <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('lastUpdated').textContent = `Last updated: ${new Date().toLocaleTimeString()}`;

  // Chart
  const topCoins = data.slice(0, 5);
  const labels = topCoins.map(c => c.name);
  const prices = topCoins.map(c => c.current_price);

  const ctx = document.getElementById('cryptoChart').getContext('2d');
  if (window.cryptoChart) window.cryptoChart.destroy(); // Prevent duplicate charts

  window.cryptoChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Price in USD',
        data: prices,
        backgroundColor: '#8d6e63',
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => `$${value}`
          }
        }
      }
    }
  });
}

fetchCryptoData();
setInterval(fetchCryptoData, 300000); // refresh every 5 mins
