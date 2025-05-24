const apiKey = "YOUR_OPENWEATHER_API_KEY";

function getWeather() {
  const city = document.getElementById("cityInput").value;
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      document.getElementById("weatherOutput").innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature: ${temp} °C</p>
        <p>Humidity: ${humidity}%</p>
      `;
      renderWeatherChart(temp, humidity);
    })
    .catch(() => {
      document.getElementById("weatherOutput").innerHTML = `<p>City not found!</p>`;
    });
}

function renderWeatherChart(temp, humidity) {
  const ctx = document.getElementById("weatherChart").getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Temperature", "Humidity"],
      datasets: [{
        label: "Weather Info",
        data: [temp, humidity],
        backgroundColor: ["#ff69b4", "#ffc0cb"],
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}
