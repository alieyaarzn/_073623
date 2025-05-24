// API key dari OpenWeatherMap (sila gantikan dengan API key sendiri jika ada)
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // <-- Ganti di sini

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');

async function getWeather(city) {
  if (!city) {
    weatherDisplay.innerHTML = '<p>Please enter a city name.</p>';
    return;
  }

  weatherDisplay.innerHTML = '<p>Loading...</p>';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();

    weatherDisplay.innerHTML = `
      <div class="weather-card">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
        <div class="weather-info">
          <h3>${data.name}, ${data.sys.country}</h3>
          <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
          <p><strong>Condition:</strong> ${data.weather[0].description}</p>
          <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        </div>
      </div>
    `;
  } catch (error) {
    weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

searchBtn.addEventListener('click', () => {
  getWeather(cityInput.value.trim());
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getWeather(cityInput.value.trim());
  }
});

// Optional: load weather for a default city on page load
getWeather('Kuala Lumpur');
