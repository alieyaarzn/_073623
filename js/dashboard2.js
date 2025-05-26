document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#cryptoTable tbody");
  const chartCtx = document.getElementById("cryptoChart").getContext("2d");

  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
    .then(response => response.json())
    .then(data => {
      // Populate table
      data.forEach((coin, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${coin.market_cap_rank}</td>
          <td>${coin.name}</td>
          <td>${coin.symbol.toUpperCase()}</td>
          <td>$${coin.current_price.toLocaleString()}</td>
          <td>$${coin.market_cap.toLocaleString()}</td>
          <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'};">
            ${coin.price_change_percentage_24h.toFixed(2)}%
          </td>
        `;
        tableBody.appendChild(row);
      });

      document.getElementById('lastUpdated').textContent = `Last updated: ${new Date().toLocaleTimeString()}`;

      // Pie Chart: Top 5 by market cap
      const top5 = data.slice(0, 5);
      const labels = top5.map(coin => coin.name);
      const values = top5.map(coin => coin.market_cap);

      new Chart(chartCtx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Market Cap',
            data: values,
            backgroundColor: ['#a67c52', '#deb887', '#e0c3a8', '#c2a47e', '#f2d2b6'],
            borderColor: '#fff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#3d2b1f',
                font: {
                  size: 14
                }
              }
            }
          }
        }
      });
    })
    .catch(error => {
      console.error("Error fetching crypto data:", error);
      tableBody.innerHTML = `<tr><td colspan="6">Failed to load data.</td></tr>`;
    });
});
