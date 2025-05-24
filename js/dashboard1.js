async function fetchWeather() {
  const city = document.getElementById('cityInput').value;
  const apiKey = 'your_openweather_api_key';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const res = await fetch(url);
  const data = await res.json();

  const temp = data.main.temp;
  const humidity = data.main.humidity;
  const labels = ['Temperature (°C)', 'Humidity (%)'];
  const values = [temp, humidity];

  const ctx = document.getElementById('weatherChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Weather Data',
        data: values,
        backgroundColor: ['#007bff', '#28a745']
      }]
    },
    options: { responsive: true }
  });
}
