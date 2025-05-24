async function loadCryptoData() {
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1';
  const response = await fetch(url);
  const data = await response.json();

  const tableBody = document.querySelector("#cryptoTable tbody");
  const labels = [], prices = [];

  data.forEach(coin => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${coin.name}</td><td>${coin.symbol.toUpperCase()}</td><td>$${coin.current_price}</td>`;
    tableBody.appendChild(row);
    labels.push(coin.name);
    prices.push(coin.current_price);
  });

  new Chart(document.getElementById('cryptoChart').getContext('2d'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Price in USD',
        data: prices,
        backgroundColor: 'rgba(255, 182, 193, 0.6)',
        borderColor: 'rgba(255, 105, 180, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

loadCryptoData();
