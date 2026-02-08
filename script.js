const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherDiv = document.getElementById("weather");

// 🔑 yahan sirf API KEY hogi
const API_KEY = "e9a2b23c5da34eab94b264df5a87faa2";

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city === "") {
    weatherDiv.innerHTML = "<p>❌ Please enter a city name</p>";
    return;
  }

  weatherDiv.innerHTML = "<p>⏳ Loading...</p>";

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  )
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        weatherDiv.innerHTML = "<p>❌ City not found</p>";
        return;
      }

      weatherDiv.innerHTML = `
        <h3>${data.name}</h3>
        <p>🌡 Temp: ${data.main.temp} °C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>🌬 Wind: ${data.wind.speed} m/s</p>
        <p>☁ Weather: ${data.weather[0].description}</p>
      `;
    })
    .catch(err => {
      weatherDiv.innerHTML = "<p>⚠️ Error fetching data</p>";
      console.error(err);
    });
});
