const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Ganti dengan API key anda

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const weatherDesc = document.getElementById('weatherDesc');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const ctx = document.getElementById('tempChart').getContext('2d');

let tempChart;

async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();
    if (data.cod !== '200') {
      alert('City not found!');
      return;
    }

    // Show current weather (first list item)
    const current = data.list[0];
    cityName.textContent = data.city.name + ', ' + data.city.country;
    weatherDesc.textContent = current.weather[0].description;
    temp.textContent = current.main.temp.toFixed(1);
    humidity.textContent = current.main.humidity;

    // Prepare data for chart (next 8 intervals ~24 hours)
    const labels = data.list.slice(0, 8).map((item) =>
      new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    const temps = data.list.slice(0, 8).map(item => item.main.temp);

    if (tempChart) {
      tempChart.destroy();
    }

    tempChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Temperature (°C)',
          data: temps,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: false
          }
        }
      }
    });

  } catch (error) {
    alert('Failed to fetch weather data.');
    console.error(error);
  }
}

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

// Optional: load default city on page load
fetchWeather('Kuala Lumpur');
