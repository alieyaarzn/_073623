const API_KEY = '71278c4f795db6a147fd96252a7f9868';

const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');

async function getWeather(city) {
  if (!city) {
    weatherDisplay.innerHTML = '<div class="alert alert-warning">Please enter a city name.</div>';
    return;
  }

  weatherDisplay.innerHTML = '<div class="loading">Loading weather data...</div>';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'City not found');
    }

    const data = await response.json();

    weatherDisplay.innerHTML = `
      <div class="weather-card">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
        <div class="weather-info">
          <h3>${data.name}, ${data.sys.country}</h3>
          <p><strong>🌡️ Temperature:</strong> ${data.main.temp} °C</p>
          <p><strong>🌤️ Condition:</strong> ${data.weather[0].description}</p>
          <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
          <p><strong>🌬️ Wind:</strong> ${data.wind.speed} m/s</p>
        </div>
      </div>
    `;
  } catch (error) {
    weatherDisplay.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
  }
}

// Event listeners
searchBtn.addEventListener('click', () => {
  getWeather(cityInput.value.trim());
});

cityInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getWeather(cityInput.value.trim());
  }
});

// Auto-load default city
getWeather('Kuala Lumpur');
