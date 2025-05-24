async function fetchCryptoData() {
  const coin = document.getElementById('coinInput').value.toLowerCase();
  const url = `https://api.coingecko.com/api/v3/coins/${coin}`;

  const res = await fetch(url);
  const data = await res.json();

  const marketData = data.market_data;
  const currentPrice = marketData.current_price.usd;
  const marketCap = marketData.market_cap.usd;
  const labels = ['Price (USD)', 'Market Cap (USD)'];
  const values = [currentPrice, marketCap];

  const ctx = document.getElementById('cryptoChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Crypto Data',
        data: values,
        backgroundColor: ['#ffc107', '#17a2b8']
      }]
    },
    options: { responsive: true }
  });
}
