const API_KEY = "f108f4fedb06a718196682fa7984d602";

const locationInfo = document.querySelector(".location");
function FromKelvinToCelcius(value) {
  return Math.round((value - 273.15) * 100) / 100;
}
function getWeatherInfo(lat, lon) {
  //   return fetch(
  //     `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  //   ).then((res) => res.json());
  return fetch(`http://localhost:3000/weather`).then((res) => res.json());
}

function successCallback(data) {
  console.log(data.coords);
  const { latitude, longitude } = data.coords;
  getWeatherInfo(latitude, longitude).then((res) => {
    const temperature = FromKelvinToCelcius(res.main.temp);
    const city = res.name;
    locationInfo.innerHTML = `${temperature}°C @ ${city}`;
  });
}

function errorCallback(error) {
  console.log(error);
}

function main() {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

main();
