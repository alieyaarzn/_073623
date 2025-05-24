async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Replace with your OpenWeather API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.cod === 200) {
    document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("description").textContent = `Weather: ${data.weather[0].description}`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
  } else {
    alert("City not found!");
  }
}
