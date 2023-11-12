var searchInputEl = document.getElementById("search-input-text");
var searchButtonEl = document.getElementById("search-button");
var cityNameEl = document.getElementById("cityname");
var cityHistoryEl = document.getElementById("city-history");
var searchHistory = document.getElementById('search-history');

var indexs = [0, 7, 15, 23, 31, 39];

var cityDayEl = [
  document.getElementById("cityday"),
  document.getElementById("cityday1"),
  document.getElementById("cityday2"),
  document.getElementById("cityday3"),
  document.getElementById("cityday4"),
  document.getElementById("cityday5"),
];

var tempEls = [
  document.getElementById("temp"),
  document.getElementById("temp1"),
  document.getElementById("temp2"),
  document.getElementById("temp3"),
  document.getElementById("temp4"),
  document.getElementById("temp5"),
];

var humidEls = [
  document.getElementById("humid"),
  document.getElementById("humid1"),
  document.getElementById("humid2"),
  document.getElementById("humid3"),
  document.getElementById("humid4"),
  document.getElementById("humid5"),
];

var windEls = [
  document.getElementById("wind"),
  document.getElementById("wind1"),
  document.getElementById("wind2"),
  document.getElementById("wind3"),
  document.getElementById("wind4"),
  document.getElementById("wind5"),
];

var weatherIconEls = [
  document.getElementById("weather-icon"),
  document.getElementById("weather-icon1"),
  document.getElementById("weather-icon2"),
  document.getElementById("weather-icon3"),
  document.getElementById("weather-icon4"),
  document.getElementById("weather-icon5"),
];

var weatherDisplayEl = document.getElementById("displayweather");
var weatherIconEl = document.getElementById("weather-icon");

var apiKey = "b0eabc5114cc9ad971e8bc76e628bb5e";
var cities = [];
var city_history = [];
var temps = [6];
var humids = [6];
var winds = [6];
var dates = [6];

function getLocation(city) {
  var locationUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    apiKey;

  fetch(locationUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeather(lat, lon);
    });
}

function getWeather(lat, lon) {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric" +
    "&lang=english" +
    "&appid=" +
    apiKey;

  fetch(weatherUrl)
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      displayWeather(data);
    });
}

function displayWeather(data) {
  var city = data.city.name;
  cityHistoryEl.textContent = "";

  for (let j = 0; j < 6; j++) {
    temps[j] = data.list[indexs[j]].main.temp;
    humids[j] = data.list[indexs[j]].main.humidity;
    winds[j] = data.list[indexs[j]].wind.speed;
    dates[j] = new Date(data.list[indexs[j]].dt * 1000);
    tempEls[j].textContent = "Temperature: " + temps[j] + "°C";
    humidEls[j].textContent = "Humidity: " + humids[j] + "%";
    windEls[j].textContent = "Wind Speed: " + winds[j] + "KM/H";
    cityDayEl[j].textContent = "City Day: " + city + " " + dates[j].toLocaleDateString();
    weatherIconEls[j].setAttribute("src", `https://openweathermap.org/img/w/${data.list[indexs[j]].weather[0].icon}.png`);
  }
}

searchButtonEl.addEventListener("click", handleSearch);

function handleSearch() {
  var city = searchInputEl.value.trim();
  if (city) {
    getLocation(city);
  }
  if (citiesSearched.length >=5) {
    citiesSearched.pop();
  }
  citiesSearched.unshift(city)
  printHistory();
  updateHistory();
}

var citiesSearched = JSON.parse(localStorage.getItem("citiesSearched")) || [];

function printHistory () {
    searchHistory.innerHTML = '';
    for (let i = 0; i < citiesSearched.length; i++) {
        const list = document.createElement('li');
        list.setAttribute('id', citiesSearched[i]);
        searchHistory.appendChild(list);

        const button = document.createElement('button');
        button.setAttribute('value', citiesSearched[i]);
        button.textContent = citiesSearched[i];
        list.appendChild(button);

        button.addEventListener('click', function(event) {
            const city = event.target.value;
            console.log(city);
            getLocation(city);
        });
    }
};

function updateHistory() {
    localStorage.setItem('citiesSearched', JSON.stringify(citiesSearched));
    printHistory();
}
printHistory();