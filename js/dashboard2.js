const cryptoTableBody = document.querySelector('#cryptoTable tbody');
const ctx = document.getElementById('cryptoChart').getContext('2d');

let cryptoChart;

async function fetchCryptoData() {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await res.json();

    // Tulis table
    cryptoTableBody.innerHTML = '';
    data.forEach(coin => {
      const changeClass = coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';
      cryptoTableBody.innerHTML += `
        <tr>
          <td>${coin.market_cap_rank}</td>
          <td><img src="${coin.image}" alt="${coin.name}" style="width:20px; vertical-align:middle; margin-right:6px;"> ${coin.name}</td>
          <td>${coin.symbol.toUpperCase()}</td>
          <td>$${coin.current_price.toLocaleString()}</td>
          <td>$${coin.market_cap.toLocaleString()}</td>
          <td class="${changeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</td>
        </tr>
      `;
    });

    // Update chart
    const labels = data.map(c => c.symbol.toUpperCase());
    const prices = data.map(c => c.current_price);

    if (cryptoChart) cryptoChart.destroy();

    cryptoChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Price in USD',
          data: prices,
          backgroundColor: 'rgba(247, 182, 205, 0.7)',
          borderColor: 'rgba(209, 75, 143, 1)',
          borderWidth: 1,
          borderRadius: 5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: value => `$${value.toLocaleString()}`
            }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#9e295c', font: { weight: '600', size: 14 } }
          }
        }
      }
    });

  } catch (error) {
    cryptoTableBody.innerHTML = `<tr><td colspan="6">Error loading data</td></tr>`;
    console.error(error);
  }
}

fetchCryptoData();
