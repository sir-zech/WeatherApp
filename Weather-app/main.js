const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.search-btn').addEventListener('click', () => {
    getResults();
  });

  document.querySelector('.search-box').addEventListener('keypress', (evt) => {
    if (evt.key === "Enter") {
      getResults();
    }
  });
});

async function getResults() {
  const city = document.querySelector('.search-box').value;
  const country = document.querySelector('.country-select').value;
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  let query = `${city}`;
  if (country) {
    query += `,${country}`;
  }

  try {
    const response = await fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);
    const weather = await response.json();

    if (weather.cod === "404") {
      alert("City not found. Please try again.");
      return;
    }

    displayResults(weather);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayResults(weather) {
  const city = document.querySelector('.location .city');
  city.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `<i class="fas fa-thermometer-half"></i> ${Math.round(weather.main.temp)}<span>°C</span>`;

  const weatherEl = document.querySelector('.current .weather');
  weatherEl.innerHTML = `<i class="fas fa-cloud-sun"></i> ${weather.weather[0].main}`;

  const hilow = document.querySelector('.hi-low');
  hilow.innerHTML = `<i class="fas fa-temperature-low"></i> ${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
