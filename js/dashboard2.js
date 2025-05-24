const cryptoSearchBtn = document.getElementById('cryptoSearchBtn');
const cryptoInput = document.getElementById('cryptoInput');
const cryptoName = document.getElementById('cryptoName');
const cryptoPrice = document.getElementById('cryptoPrice');
const cryptoMarketCap = document.getElementById('cryptoMarketCap');
const cryptoChange = document.getElementById('cryptoChange');
const cryptoCtx = document.getElementById('cryptoChart').getContext('2d');

let cryptoChart;

async function fetchCryptoData(id) {
  try {
    // Get current data
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
    const data = await res.json();
    if (data.error) {
      alert('Crypto not found!');
      return;
    }

    cryptoName.textContent = data.name + ' (' + data.symbol.toUpperCase() + ')';
    cryptoPrice.textContent = data.market_data.current_price.usd.toLocaleString();
    cryptoMarketCap.textContent = data.market_data.market_cap.usd.toLocaleString();
    cryptoChange.textContent = data.market_data.price_change_percentage_24h.toFixed(2);

    // Fetch 7-day price chart data
    const chartRes = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
    );
    const chartData = await chartRes.json();

    const labels = chartData.prices.map(p => {
      const d = new Date(p[0]);
      return `${d.getMonth()+1}/${d.getDate()}`;
    });

    const prices = chartData.prices.map(p => p[1]);

    if (cryptoChart) {
      cryptoChart.destroy();
    }

    cryptoChart = new Chart(cryptoCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Price (USD)',
          data: prices,
          borderColor: 'rgba(255, 206, 86, 1)',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  } catch (error) {
    alert('Failed to fetch crypto data.');
    console.error(error);
  }
}

cryptoSearchBtn.addEventListener('click', () => {
  const id = cryptoInput.value.trim().toLowerCase();
  if (id) fetchCryptoData(id);
});

// Load default crypto on page load
fetchCryptoData('bitcoin');
