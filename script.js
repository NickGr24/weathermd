const apiKey = "fab8f14ee50222e826dd6fe6c562379d";
const city = "Chișinău";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const card = document.querySelectorAll(".card")[0];
      const temp = Math.round(data.main.temp);
      const windSpeed = data.wind.speed;
      const windDir = getWindDirection(data.wind.deg);
      const description = capitalizeFirst(data.weather[0].description);
      const iconClass = getWeatherIcon(data.weather[0].main); // Выбираем Font Awesome иконку

      card.innerHTML = `
        <p class="card-txt">сегодня</p>
        <i class="fa ${iconClass} fa-beat card-icon"></i>
        <p class="card-txt">${description}</p>
        <p class="card-txt">ветер:</p>
        <p class="card-txt">${windDir} ${windSpeed} км/ч</p>
        <p class="card-txt">Температура ${temp}°C</p>
      `;
    })
    .catch(error => {
      console.error("Ошибка при получении данных:", error);
    });

  function getWindDirection(deg) {
    const dirs = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
    return dirs[Math.round(deg / 45) % 8];
  }

  function getWeatherIcon(condition) {
    // Привязываем погодные условия к Font Awesome
    switch (condition.toLowerCase()) {
      case "clear":
        return "fa-regular fa-sun";
      case "clouds":
        return "fa-solid fa-cloud";
      case "rain":
        return "fa-solid fa-cloud-showers-heavy";
      case "drizzle":
        return "fa-solid fa-cloud-rain";
      case "thunderstorm":
        return "fa-solid fa-bolt";
      case "snow":
        return "fa-regular fa-snowflake";
      case "mist":
      case "fog":
      case "haze":
        return "fa-solid fa-smog";
      default:
        return "fa-solid fa-cloud"; // по умолчанию
    }
  }

  function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }