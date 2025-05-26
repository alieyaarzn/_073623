document.getElementById('searchBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (city !== '') {
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  const apiKey = '71278c4f795db6a147fd96252a7f9868'; // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error("City not found");
      }
      return res.json();
    })
    .then(data => {
      updateWeatherCard(data);
    })
    .catch(error => {
      alert("Error: " + error.message);
    });
}

function updateWeatherCard(data) {
  const card = document.getElementById('weatherDisplay');
  const icon = document.getElementById('weatherIcon');
  const cityName = document.getElementById('cityName');
  const description = document.getElementById('description');
  const temperature = document.getElementById('temperature');
  const humidity = document.getElementById('humidity');
  const wind = document.getElementById('wind');

  const iconCode = data.weather[0].icon;
  icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  icon.alt = data.weather[0].description;

  cityName.textContent = data.name;
  description.textContent = data.weather[0].description.replace(/^\w/, c => c.toUpperCase());
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  wind.textContent = `${data.wind.speed} km/h`;

  card.classList.remove('hidden');
}
