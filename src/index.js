let now = new Date();

let time = document.querySelector(".time");
let hours = now.getHours();
let minutes = now.getMinutes();
time.innerHTML = `${hours}:${minutes}`;

let currentDate = document.querySelector("#headerToday");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let date = now.getDate();
currentDate.innerHTML = `${day}, ${date} ${month} ${year}`;


function showTemperature(response) {
    let city = document.querySelector(".city");
    city.innerHTML = response.data.name;

    let maxTemperature = Math.round(response.data.main.temp_max);
    let weatherDisplayMax = document.querySelector("#max-temp");
    weatherDisplayMax.innerHTML = `${maxTemperature}º`;
    
    let minTemperature = Math.floor(response.data.main.temp_min);
    let weatherDisplayMin = document.querySelector(".minTemp");
    weatherDisplayMin.innerHTML = `${minTemperature}º`;
    
    let wind = response.data.wind.speed;
    let windSpeed = document.querySelector(".wind")
    windSpeed.innerHTML = `${wind} km/h`
    
    let humidityInfo = response.data.main.humidity;
    let humidity = document.querySelector(".rain")
    humidity.innerHTML = `${humidityInfo}%`

}

function showCity(city) {
    let apiKey = "fb4597d65c0c68cc976a169c8b7c8ebd";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    
    axios.get(apiUrl).then(showTemperature)
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let city = document.querySelector(".city");
  city.innerHTML = searchInput.value;
  showCity(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity)


function showPosition(position) {
    console.log(position);
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "fb4597d65c0c68cc976a169c8b7c8ebd";
    let units = "metric";
    let apiUrl = `api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showCurrentTemp);
}

navigator.geolocation.getCurrentPosition(showPosition);

let locationWeather = document.querySelector("button");
locationWeather.addEventListener("click", showPosition);

function conversion(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#max-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let scale = document.querySelector("#fahrenheit");
scale.addEventListener("click", conversion);
