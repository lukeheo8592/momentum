const API_KEY = "f108f4fedb06a718196682fa7984d602";

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const city = document.querySelector("#weather span:first-child");
        const weather = document.querySelector("#weather span:nth-child(2)");
        const icon = document.querySelector("#weather img:last-child");
       city.innerText = data.name;
       weather.innerText = data.weather[0].main;
       icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    
    });
}

function onGeoError() {
  alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);

//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=API_KEY
