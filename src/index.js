function cityInfo(response) {
  document.querySelector("#namecity").innerHTML = response.data.name;
  document.querySelector("#default").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#myhumidity").innerHTML = `Humidity: ${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#myWind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
}

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input").value; //search bar
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
  axios.get(urlCity).then(cityInfo);
}

function todayte(event) {
  let todate = document.querySelector("#todate");
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  event.preventDefault();

  let day = new Date();
  let hours = day.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = day.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  todate.innerHTML = `${days[day.getDay()]} ${hours}:${minutes}`;
  navigator.geolocation.getCurrentPosition(myPosition);
}

function myPosition(position) {
  let myLat = position.coords.latitude;
  let myLon = position.coords.longitude;

  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeathear);
}

function showWeathear(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);

  let myWeather = document.querySelector("#default");
  let humid = document.querySelector("#myhumidity");
  let windSpeed = document.querySelector("#myWind");

  document.querySelector("#namecity").innerHTML = "Your location";
  myWeather.innerHTML = temperature;
  humid.innerHTML = `Humidity: ${humidity}%`;
  windSpeed.innerHTML = `Wind: ${wind} km/h`;
}

let search = document.querySelector("#search-button");
let current = document.querySelector("#current-button");
search.addEventListener("click", changeCity);
current.addEventListener("click", todayte);

