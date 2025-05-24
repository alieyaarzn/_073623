const weatherBtn = document.getElementById('weatherSearchBtn');
const cityInput = document.getElementById('cityInput');
const weatherCity = document.getElementById('weatherCity');
const weatherTemp = document.getElementById('weatherTemp');
const weatherDesc = document.getElementById('weatherDesc');
const weatherHumidity = document.getElementById('weatherHumidity');
const weatherWind = document.getElementById('weatherWind');
const weatherChartCtx = document.getElementById('weatherChart').getContext('2d');

const apiKey = "71278c4f795db6a147fd96252a7f9868";

let weatherChart;

async function fetchWeather(city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      alert('City not found!');
      return;
    }

    weatherCity.textContent = data.name + ', ' + data.sys.country;
    weatherTemp.textContent = data.main.temp + ' °C';
    weatherDesc.textContent = data.weather[0].description;
    weatherHumidity.textContent = data.main.humidity + ' %';
    weatherWind.textContent = data.wind.speed + ' m/s';

    const tempData = [data.main.temp_min, data.main.temp, data.main.temp_max];

    if (weatherChart) {
      weatherChart.destroy();
    }

    weatherChart = new Chart(weatherChartCtx, {
      type: 'bar',
      data: {
        labels: ['Min Temp', 'Current Temp', 'Max Temp'],
        datasets: [{
          label: 'Temperature (°C)',
          data: tempData,
          backgroundColor: ['#60a5fa', '#3b82f6', '#1d4ed8']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: false }
        }
      }
    });
  } catch (err) {
    alert('Failed to fetch weather data.');
    console.error(err);
  }
}

weatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

// Default city
fetchWeather('Kuala Lumpur');
